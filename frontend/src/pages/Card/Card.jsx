import React, { useContext, useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import { Link, useSearchParams } from "react-router-dom";
import "./Card.css";

import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
import EachWord from "../../components/EachWord/EachWord";

export default function Card() {
  const [words, setWords] = useState([]);
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const cardTitle = searchParams.get("cardTitle");

  useEffect(() => {
    const fetchWords = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APIURL}/users/${
          user._id
        }/words?cardTitle=${cardTitle}`
      );
      setWords(response.data);
    };
    fetchWords();
  }, [user, cardTitle]);

  return (
    <>
      <Topbar />
      <div className="row">
        <div className="text-center my-3">
          <h1 className="TITLE">{cardTitle}</h1>
        </div>
        <div className="col-4"></div>
      </div>
      <div className="container my-3 pb-3">
        <div className="d-flex my-2">
          <Link
            to={`/newWord?cardTitle=${cardTitle}`}
            className="btn btn-secondary ms-auto my-auto px-5"
          >
            新規作成
          </Link>
        </div>
        <div className="row">
          <div className="col-4 text-center">
            <div className="bg-secondary-subtle border border-secondary State">
              <h4 className="m-auto p-3 StateText">未着手</h4>
            </div>
            {words.map((word) => {
              if (word.state === 0) {
                return (
                  <EachWord word={word} key={word._id} cardTitle={cardTitle} />
                );
              }
            })}
          </div>
          <div className="col-4 text-center">
            <div className="bg-warning-subtle border border-warning State">
              <h4 className="m-auto p-3 StateText">学習中</h4>
            </div>
            {words.map((word) => {
              if (word.state === 1) {
                return (
                  <EachWord word={word} key={word._id} cardTitle={cardTitle} />
                );
              }
            })}
          </div>
          <div className="col-4 text-center">
            <div className="bg-success-subtle border border-success State">
              <h4 className="m-auto p-3 StateText">学習済み</h4>
            </div>
            {words.map((word) => {
              if (word.state === 2) {
                return (
                  <EachWord word={word} key={word._id} cardTitle={cardTitle} />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
