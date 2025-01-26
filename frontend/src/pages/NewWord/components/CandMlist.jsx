import { useContext } from "react";
import { CandMContext, CandMDispatchContext } from "../contexts/CandMProvider";
import { CandMitem } from "./CandMitem";
import { nanoid } from "nanoid";

export const CandMlist = () => {
  const CandMs = useContext(CandMContext);

  const dispatch = useContext(CandMDispatchContext);

  const addCandM = (e) => {
    e.preventDefault();

    const newCandM = {
      id: nanoid(),
      class: "",
      meanings: [
        {
          id: nanoid(),
          content: "",
        },
      ],
    };
    dispatch({ type: "CandM/add", CandM: newCandM });
  };

  return (
    <>
      <div className="align-items-center row">
        {CandMs.map((CandM) => (
          <CandMitem CandM={CandM} key={CandM.id} />
        ))}
      </div>
      <div className="col-1 m-auto mb-2">
        <a className="btn btn-primary mb-2 pb-2" onClick={addCandM}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
        </a>
      </div>
    </>
  );
};
