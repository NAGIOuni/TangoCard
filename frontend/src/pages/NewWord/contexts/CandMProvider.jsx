import { createContext, useReducer } from "react";
import { CandMReducer } from "./CandMReducer";
import { nanoid } from "nanoid";

const initialCandMs = [
  {
    id: nanoid(),
    class: "",
    meanings: [
      {
        id: nanoid(),
        content: "",
      },
    ],
  },
];

export const CandMContext = createContext();
export const CandMDispatchContext = createContext();

export const CandMProvider = ({ children }) => {
  const [CandMs, dispatch] = useReducer(CandMReducer, initialCandMs);

  return (
    <CandMContext.Provider value={CandMs}>
      <CandMDispatchContext.Provider value={dispatch}>
        {children}
      </CandMDispatchContext.Provider>
    </CandMContext.Provider>
  );
};
