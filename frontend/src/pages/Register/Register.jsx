import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import TitleLeft from "../../components/TitleLeft/TitleLeft";
import "./Register.css";

export default function Register() {
  return (
    <div className="Body">
      <div className="vh-100 d-flex text-center container py-4 px-3 mx-auto align-items-center ">
        <div className="row vw-100">
          <TitleLeft />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
