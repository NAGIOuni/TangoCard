import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EachWord({ word, cardTitle }) {
  const navigate = useNavigate();
  const toWord = () => {
    navigate(`/word?cardTitle=${cardTitle}&word=${word.word}`);
  };

  const UTCtoTime = (utc) => {
    const dateObj = new Date(utc);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate() + 1;
    const hour = dateObj.getHours() + 1;
    const min = dateObj.getMinutes() + 1;

    return `${year}年${month}月${date}日 ${hour}:${min}`;
  };

  return (
    <>
      <div className="">
        <div className="card m-2" onClick={toWord}>
          <div className="card-body row wordCard m-0">
            <div className="text-center">
              <h4 className="card-title">{word.word}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
