import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import TitleLeft from "../../components/TitleLeft/TitleLeft";
import "./Login.css";

export default function Login() {
  return (
    <div className="Body">
      <div className="vh-100 d-flex text-center container py-4 px-3 mx-auto align-items-center ">
        <div className="row vw-100">
          <TitleLeft />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
