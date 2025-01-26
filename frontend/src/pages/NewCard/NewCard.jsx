import React, { useContext, useRef } from "react";
import Topbar from "../../components/Topbar/Topbar";
import { useNavigate } from "react-router-dom";
import "./NewCard.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export default function NewCard() {
  const navigate = useNavigate();
  const toWord = () => {
    navigate("/word");
  };

  const cardTitle = useRef();
  const desc = useRef();

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCard = {
      cardTitle: cardTitle.current.value,
      desc: desc.current.value,
      creator: user._id,
    };

    const response = await axios.post(
      `http://localhost:5000/api/users/${user._id}/cards`,
      newCard
    );
    console.log(response.data);
    navigate("/show");
  };

  return (
    <>
      <Topbar />
      <div className="container mt-3">
        <div className="d-flex row justify-content-center">
          <div className="card col-8 m-2">
            <form onSubmit={handleSubmit} action="/">
              <div className="card-body">
                <h3 className="card-title mb-4 text-center">新しいカード</h3>
                <div className="row">
                  <label
                    htmlFor="title"
                    className="col-2 fs-5 m-auto text-center"
                  >
                    タイトル
                  </label>
                  <div className="col-10 my-2">
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      required
                      ref={cardTitle}
                    />
                  </div>
                  <label
                    htmlFor="desc"
                    className="col-2 fs-5 m-auto text-center"
                  >
                    説明
                  </label>
                  <div className="col-10 my-2">
                    <textarea className="form-control" id="desc" ref={desc} />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <button className="btn btn-success col-6 mt-4">作成</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
