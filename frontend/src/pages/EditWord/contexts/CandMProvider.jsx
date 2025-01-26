import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CandMReducer } from "./CandMReducer";
import { nanoid } from "nanoid";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../state/AuthContext";

const initialCandMs = [];

export const CandMContext = createContext();
export const CandMDispatchContext = createContext();
export const wordContext = createContext();

export const CandMProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const qWord = searchParams.get("word");
  const { user } = useContext(AuthContext);
  const [word, setWord] = useState({});

  useEffect(() => {
    const fetchWord = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APIURL}/users/${user._id}/word?word=${qWord}`
      );
      dispatch({ type: "CandM/set", CandMs: response.data.meanings });
      setWord(response.data);
    };
    fetchWord();
  }, [user]);
  const [CandMs, dispatch] = useReducer(CandMReducer, initialCandMs);

  return (
    <CandMContext.Provider value={CandMs}>
      <CandMDispatchContext.Provider value={dispatch}>
        <wordContext.Provider value={word}>{children}</wordContext.Provider>
      </CandMDispatchContext.Provider>
    </CandMContext.Provider>
  );
};
