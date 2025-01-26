import React from "react";
import TitleLeft from "../../components/TitleLeft/TitleLeft";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };
  const toRegister = () => {
    navigate("/register");
  };
  return (
    <div className="Body">
      <div className="text-center vh-100 d-flex container py-4 px-3 mx-auto align-items-center">
        <div className="row vw-100">
          <TitleLeft />
          <div className="col-4 d-grid gap-2 mx-auto">
            <button className="btn btn-primary mx-2" onClick={toLogin}>
              LOGIN
            </button>
            <button className="btn btn-success mx-2" onClick={toRegister}>
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
