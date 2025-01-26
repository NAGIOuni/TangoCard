import React, { useContext, useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
import EachCard from "../../components/EachCard/EachCard";

export default function Show() {
  const [cards, setCards] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APIURL}/users/${user._id}/cards`
      );
      // console.log(response.data);
      setCards(response.data);
    };
    fetchCards();
  }, [user]);

  const navigate = useNavigate();
  const toCard = () => {
    navigate("/card");
  };
  return (
    <>
      <Topbar />
      <div className="container mt-3">
        <div className="d-flex">
          <h1 className="">単語カード一覧</h1>
          <a href="/newCard" className="btn btn-secondary my-auto ms-auto px-5">
            新規作成
          </a>
        </div>
        <div className="row">
          <div className="col-8 m-auto">
            {cards.map((card) => (
              <EachCard card={card} key={card._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
