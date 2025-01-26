import { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { Form } from "./ModalForm/ModalForm";
import { Result } from "./ModalResult/ModalResult";
import "./Modal.css";

export const Modal = ({ setModalOpen, word, setImage }) => {
  const [settedWord, setWord] = useState(word);
  const [imgs, setImgs] = useState([]);
  const getPhotoData = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${settedWord}&per_page=30&client_id=${
          import.meta.env.VITE_UNSPLASH_API_KEY
        }`
      )
      .then(async (res) => {
        const oldImgs = [];
        await res.data.results.map((result) => {
          const newImg = {
            id: nanoid(),
            content: result.urls.regular,
          };
          oldImgs.push(newImg);
          // setImgs([...imgs, newImg]);
        });
        setImgs(oldImgs);
        console.log(oldImgs);
      });
  };

  return (
    <div className="Modal mt-5 mb-2">
      <div className="Modal-Content">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <h1 className="my-2">クリックでイメージを選択</h1>
              <Form
                word={settedWord}
                setWord={setWord}
                getPhotoData={getPhotoData}
              />
              {imgs ? (
                <Result
                  imgs={imgs}
                  setImage={setImage}
                  setModalOpen={setModalOpen}
                />
              ) : (
                ""
              )}
              <hr />
              <a
                href="/"
                className="btn btn-danger m-auto"
                onClick={(e) => {
                  e.preventDefault();
                  setModalOpen(false);
                }}
              >
                閉じる
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
