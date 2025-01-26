import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";
import { loginCall } from "../../actionCalls";

export default function LoginForm() {
  const username = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginCall(
      {
        username: username.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  const navigate = useNavigate();
  const toRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="card d-grid col-4 offset-1 py-5">
        <div className="card-body">
          <h3 className="card-title text-light pb-3">LOGIN</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                ref={username}
              />
              {/* <div className="invalid-feedback">入力してください</div> */}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                ref={password}
              />
              {/* <div className="invalid-feedback">入力してください</div> */}
            </div>
            <div className="col-8 d-grid gap-2 mx-auto">
              <button className="btn btn-primary mt-3">LOGIN</button>
            </div>
          </form>
          <div className="col-8 d-grid gap-2 mx-auto">
            <button className="btn btn-success mt-3" onClick={toRegister}>
              REGISTER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
