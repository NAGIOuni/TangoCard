import { nanoid } from "nanoid";
import { Mitem } from "./Mitem";
import { useContext, useEffect } from "react";
import { CandMContext, CandMDispatchContext } from "../contexts/CandMProvider";

export const Mlist = ({ CandM }) => {
  const dispatch = useContext(CandMDispatchContext);
  const CandMs = useContext(CandMContext);

  const addMeaning = (e) => {
    e.preventDefault();

    const newMeaning = {
      id: nanoid(),
      content: "",
    };
    const newCandM = {
      ...CandM,
      meanings: [...CandM.meanings, newMeaning],
    };
    // Mdispatch({ type: "meaning/add", meaning: newMeaning });
    dispatch({ type: "CandM/update", CandM: newCandM });
  };

  return (
    <>
      <div className="col-8 m-auto">
        {CandM.meanings
          ? CandM.meanings.map((meaning) => (
              <Mitem meaning={meaning} key={meaning.id} CandM={CandM} />
            ))
          : ""}
      </div>
      <div className="col-1 m-auto">
        <button className="btn btn-primary pb-2 mx-0" onClick={addMeaning}>
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
        </button>
      </div>
    </>
  );
};
