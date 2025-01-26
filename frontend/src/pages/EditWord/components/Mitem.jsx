import { useContext, useRef, useState } from "react";
import { CandMDispatchContext } from "../contexts/CandMProvider";

export const Mitem = ({ meaning, CandM }) => {
  const [editingContent, setEditingContent] = useState(meaning.content);
  const dispatch = useContext(CandMDispatchContext);
  const ref = useRef();

  const changeContent = (e) => {
    setEditingContent(e.target.value);
  };

  const confirmContent = () => {
    const newMeaning = {
      id: meaning.id,
      content: ref.current.value,
    };
    const newCandM = {
      ...CandM,
      meanings: [...CandM.meanings, newMeaning],
    };
    dispatch({
      type: "meaning/update",
      CandM: newCandM,
      meaning: newMeaning,
    });
    // console.log(newCandM);
  };

  const deleteMeaning = (e) => {
    e.preventDefault();

    dispatch({
      type: "meaning/delete",
      CandM: CandM,
      meaning: meaning,
    });
  };

  return (
    <div key={meaning.id} className="row">
      <div className="col-10">
        <input
          type="text"
          className="form-control my-2"
          ref={ref}
          onChange={changeContent}
          onKeyUp={confirmContent}
          placeholder="意味"
          value={editingContent}
        />
      </div>
      <div className="col-2 m-auto">
        <button className="btn btn-danger m-auto pb-2" onClick={deleteMeaning}>
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
    </div>
  );
};
