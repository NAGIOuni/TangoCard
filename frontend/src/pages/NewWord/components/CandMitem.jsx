import { nanoid } from "nanoid";
import { CandMDispatchContext } from "../contexts/CandMProvider";
import { Meanings } from "./Meanings";
import { useContext, useRef, useState } from "react";

export const CandMitem = ({ CandM }) => {
  const [editingContent, setEditingContent] = useState(CandM.class);
  const dispatch = useContext(CandMDispatchContext);
  const ref = useRef();

  const changeContent = (e) => {
    setEditingContent(e.target.value);
  };

  const confirmContent = () => {
    const newCandM = {
      ...CandM,
      class: editingContent,
    };
    dispatch({ type: "CandM/update", CandM: newCandM });
  };

  const deleteCandM = (e) => {
    e.preventDefault();

    dispatch({ type: "CandM/delete", CandM: CandM });
  };

  // console.log(CandM.meanings);

  return (
    <div className="row">
      <div className="col-1 m-auto">
        <button className="btn btn-danger m-auto pb-2" onClick={deleteCandM}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-dash-lg m-0 p-0"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
            />
          </svg>
        </button>
      </div>

      <div className="card m-auto my-2 p-2 col-11">
        <div className="row card-body">
          <div className="col-3 m-auto p-0">
            <input
              type="text"
              className="form-control"
              value={editingContent}
              onChange={changeContent}
              onKeyUp={confirmContent}
              placeholder="品詞"
            />
          </div>
          <Meanings CandM={CandM} />
        </div>
      </div>
    </div>
  );
};
