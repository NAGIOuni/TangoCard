import React, { useContext, useEffect } from "react";
import { logoutCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EachCard({ card }) {
  const navigate = useNavigate();
  const toCard = () => {
    navigate(`/card?cardTitle=${card.cardTitle}`);
  };

  const UTCtoTime = (utc) => {
    const dateObj = new Date(utc);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const hour = dateObj.getHours();
    const min = dateObj.getMinutes();

    return `${year}年${month}月${date}日 ${hour}:${min}`;
  };

  return (
    <>
      <div className="card my-3">
        <div className="card-body row m-0 wordCard" onClick={toCard}>
          <div className="col-8 d-flex align-items-center">
            <h3 className="card-title">{card.cardTitle}</h3>
          </div>
          <div className="col-4">
            <p className="card-text">作成日：{UTCtoTime(card.createdAt)}</p>
            <p className="card-text">単語数：{card.words.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}
