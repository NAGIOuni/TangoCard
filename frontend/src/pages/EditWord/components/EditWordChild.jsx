import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../../../components/Topbar/Topbar";
import { Classes } from "./Classes";
import {
  CandMContext,
  CandMDispatchContext,
  wordContext,
} from "../contexts/CandMProvider";
import { AuthContext } from "../../../state/AuthContext";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const APIURL = import.meta.env.VITE_APIURL;

export const EditWordChild = () => {
  const word = useContext(wordContext);
  const pronunciationSign = useRef();
  const state = useRef();
  const image = useRef();
  const example = useRef();
  const exampleJpn = useRef();
  const CandMs = useContext(CandMContext);
  const dispatch = useContext(CandMDispatchContext);
  const navigate = useNavigate();

  const [currentWord, setWord] = useState(word.word);
  const [currentSign, setSign] = useState(
    word.pronunciation ? word.pronunciation.sign : ""
  );
  const [currentImage, setImage] = useState(word.img);
  const [currentExample, setExample] = useState(word.example);
  const [currentExampleJpn, setExampleJpn] = useState(word.exampleJpn);

  const { user } = useContext(AuthContext);

  const [card, setCard] = useState("");

  const [searchParams] = useSearchParams();
  const cardTitle = searchParams.get("cardTitle");

  useEffect(() => {
    const fetchCard = async () => {
      const response = await axios.get(
        // `${APIURL}/users/${user._id}/cards?cardTitle=${cardTitle}`
        `${import.meta.env.VITE_APIURL}/users/${
          user._id
        }/cards?cardTitle=${cardTitle}`
      );
      setCard(response.data);
    };
    fetchCard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWord = {
      word: word.current.value,
      meanings: CandMs,
      img: image.current.value,
      example: example.current.value,
      exampleJpn: exampleJpn.current.value,
      pronunciation: {
        sign: pronunciationSign.current.value,
        sound: "",
      },
      creator: user._id,
      card: card._id,
    };
    // console.log(card);
    await axios.post(
      `${import.meta.env.VITE_APIURL}/users/${user._id}/cards/${
        card._id
      }/words`,
      newWord
    );
    navigate(`/card?cardTitle=${cardTitle}`);
  };

  return (
    <>
      <Topbar />
      <div className="container mt-3">
        <div className="d-flex row justify-content-center flex-wrap">
          <div className="card col-8 m-2">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="card-body">
                <h3 className="card-title mb-4 text-center">単語を編集</h3>
                <div className="d-flex row">
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="英単語"
                      style={{
                        width: "100%",
                      }}
                      value={currentWord}
                      onChange={(e) => setWord(e.target.value)}
                    />
                  </div>
                  <div className="col-4 m-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="発音記号"
                      value={word.pronunciation ? word.pronunciation.sign : ""}
                    />
                  </div>
                </div>
                <hr />
                <div className="align-items-center mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    placeholder="イメージURL"
                    value={word.img}
                  />
                </div>
                <Classes />
                <div className="row align-items-center">
                  <label htmlFor="example" className="col-2 text-center">
                    例文
                  </label>
                  <div className="col-10">
                    <textarea
                      type="text"
                      className="form-control mb-2"
                      id="example"
                      placeholder="英文"
                      value={word.example}
                    />
                    <textarea
                      type="text"
                      className="form-control"
                      id="example"
                      placeholder="日本語訳"
                      value={word.exampleJpn}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <button className="btn btn-primary mt-3 col-6">更新</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
