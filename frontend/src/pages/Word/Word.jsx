import React, { useContext, useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";
import { CandMs } from "./components/CandMs";
import { State } from "./components/State";

const APIURL = import.meta.env.VITE_APIURL;

export default function Word() {
  const [searchParams] = useSearchParams();
  const [word, setWord] = useState({});
  const { user } = useContext(AuthContext);
  const qWord = searchParams.get("word");
  const cardTitle = searchParams.get("cardTitle");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWord = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APIURL}/words/${user._id}/word?word=${qWord}`
      );
      setWord(response.data);
    };
    fetchWord();
  }, [user]);

  const stateUp = async () => {
    const newWord = {
      ...word,
      state: word.state + 1,
    };
    await axios.put(
      `${import.meta.env.VITE_APIURL}/words/${user._id}/words/${word._id}`,
      newWord
    );
    navigate(`/card?cardTitle=${cardTitle}`);
  };

  const stateDown = async () => {
    const newWord = {
      ...word,
      state: word.state - 1,
    };
    await axios.put(
      `${import.meta.env.VITE_APIURL}/users/${user._id}/words/${word._id}`,
      newWord
    );
    navigate(`/card?cardTitle=${cardTitle}`);
  };

  const deleteWord = async () => {
    await axios.delete(
      `${import.meta.env.APIURL}/users/${user._id}/words/${word._id}`
    );
    navigate(`/card?cardTitle=${cardTitle}`);
  };

  return (
    <>
      <Topbar />
      <div className="container my-3">
        <div className="d-flex row justify-content-center flex-wrap">
          <div className="card col-8 m-2">
            <div className="card-body">
              <div className="d-flex row">
                <h1 className="card-title my-auto col-7">{word.word}</h1>
                <span className="my-auto col-3">
                  {word.pronunciation ? word.pronunciation.sign : ""}
                </span>
                <h4 className="col-2 my-auto">
                  <State word={word} />
                </h4>
              </div>
              <hr />
              <div className="mb-3">
                <img
                  src={word.img}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="align-items-center mb-3">
                <div className="">
                  <CandMs word={word} />
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <h5>例文</h5>
                </div>
                <div className="col-10">
                  <p className="fs-4 m-0">{word.example}</p>
                  <p>{word.exampleJpn}</p>
                </div>
              </div>
              <div className="row justify-content-center">
                {word.state === 0 ? (
                  <button className="btn btn-warning col-4" onClick={stateUp}>
                    学習開始
                  </button>
                ) : (
                  ""
                )}
                {word.state === 1 ? (
                  <button className="btn btn-success col-4" onClick={stateUp}>
                    学習完了
                  </button>
                ) : (
                  ""
                )}
                {word.state === 2 ? (
                  <button className="btn btn-warning col-4" onClick={stateDown}>
                    学習をやり直す
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="row justify-content-center">
                {word.state === 1 ? (
                  <button
                    className="btn btn-secondary col-4 m-2"
                    onClick={stateDown}
                  >
                    学習をやめる
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="d-flex">
                <button
                  className="btn btn-danger m-2 ms-auto"
                  onClick={deleteWord}
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        </div>
        <a
          href={`/card?cardTitle=${cardTitle}`}
          className="btn btn-outline-primary my-4 ms-4 px-3"
        >
          カードに戻る
        </a>
      </div>
    </>
  );
}
