import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../../../components/Topbar/Topbar";
import { Classes } from "../components/Classes";
import { CandMContext, CandMDispatchContext } from "../contexts/CandMProvider";
import { AuthContext } from "../../../state/AuthContext";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from "./Modal";
import { createPortal } from "react-dom";

const APIURL = import.meta.env.VITE_APIURL;

export const NewWordChild = () => {
  // const word = useRef();
  // const pronunciationSign = useRef();
  // const state = useRef();
  // const image = useRef();
  // const example = useRef();
  // const exampleJpn = useRef();
  const CandMs = useContext(CandMContext);
  const dispatch = useContext(CandMDispatchContext);
  const navigate = useNavigate();

  const [word, setWord] = useState("");
  const [pronSign, setPronSign] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState("");
  const [example, setExample] = useState("");
  const [exampleJpn, setExampleJpn] = useState("");

  const { user } = useContext(AuthContext);

  const [card, setCard] = useState("");

  const [searchParams] = useSearchParams();
  const cardTitle = searchParams.get("cardTitle");

  useEffect(() => {
    const fetchCard = async () => {
      const response = await axios.get(
        // `${APIURL}/users/${user._id}/cards?cardTitle=${cardTitle}`
        `${import.meta.env.APIURL}/users/${user._id}/cards?cardTitle=${cardTitle}`
      );
      setCard(response.data);
    };
    fetchCard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWord = {
      word: word,
      meanings: CandMs,
      img: image,
      example: example,
      exampleJpn: exampleJpn,
      pronunciation: {
        sign: pronSign,
        sound: "",
      },
      creator: user._id,
      card: card._id,
    };
    // console.log(card);
    await axios.post(
      `${import.meta.env.APIURL}/users/${user._id}/cards/${card._id}/words`,
      newWord
    );
    navigate(`/card?cardTitle=${cardTitle}`);
  };

  const autoInput = async (e) => {
    e.preventDefault();
    const weblioSearch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.APIURL}/users/${user._id}/words/getFromWeblio?word=${word}`
        );
        const resData = response.data;
        console.log(response.data);
        setPronSign(resData.pronSign);
        setExample(resData.example);
        setExampleJpn(resData.exampleJpn);
        await dispatch({ type: "CandMs/update", CandMs: resData.CandMs });
        // const newWord = {
        //   word: word,
        //   meanings: CandMs,
        //   img: image,
        //   example: resData.example,
        //   exampleJpn: resData.exampleJpn,
        //   pronunciation: {
        //     sign: resData.pronSign,
        //     sound: "",
        //   },
        //   creator: user._id,
        //   card: card._id,
        // };
        // console.log(newWord);
      } catch (err) {
        console.log(err);
      }
    };
    weblioSearch();
  };

  const ModalPortal = ({ children }) => {
    const target = document.querySelector(".ModalContainer");
    return createPortal(children, target);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenClick = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <>
      <div className="ModalContainer"></div>
      {modalOpen && (
        <ModalPortal>
          <Modal setModalOpen={setModalOpen} word={word} setImage={setImage} />
        </ModalPortal>
      )}
      <Topbar />
      <div className="d-flex row justify-content-center flex-wrap my-3">
        <div className="card col-8 m-2">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">新しい単語</h3>
              <div className="d-flex row">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="英単語"
                    style={{
                      width: "100%",
                    }}
                    onChange={(e) => setWord(e.target.value)}
                    value={word}
                  />
                </div>
                <div className="col-3 m-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="発音記号"
                    onChange={(e) => setPronSign(e.target.value)}
                    value={pronSign}
                  />
                </div>
                <div className="col-3 m-auto">
                  <a className="btn btn-primary" onClick={autoInput} href="/">
                    自動入力
                  </a>
                </div>
              </div>
              <hr />
              <div className="align-items-center mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  placeholder="イメージURL"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
                <a
                  href="/"
                  className="offset-2 col-8 btn btn-primary my-2"
                  onClick={handleOpenClick}
                  disabled={modalOpen}
                >
                  イメージ画像を選択
                </a>
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
                    onChange={(e) => setExample(e.target.value)}
                    value={example}
                  />
                  <textarea
                    type="text"
                    className="form-control"
                    id="example"
                    placeholder="日本語訳"
                    onChange={(e) => setExampleJpn(e.target.value)}
                    value={exampleJpn}
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <button className="btn btn-primary mt-3 col-6">追加</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
