import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

export default function RegisterForm() {
  const username = useRef();
  const age = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== passwordConfirmation.current.value) {
      passwordConfirmation.current.setCustomValidity("パスワードが違います");
    } else {
      try {
        const user = {
          username: username.current.value,
          age: age.current.value,
          password: password.current.value,
        };
        await axios.post(`${import.meta.env.VITE_APIURL}/auth/register`, user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="card d-grid col-4 offset-1 py-5">
        <div className="card-body">
          <h3 className="card-title text-light pb-3">REGISTER</h3>
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
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                required
                ref={age}
              />
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
            </div>
            <div className="mb-3">
              <label htmlFor="passwordConfirmation" className="form-label">
                Password (Confirmation)
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirmation"
                required
                ref={passwordConfirmation}
              />
            </div>
            <div className="col-8 d-grid gap-2 mx-auto">
              <button className="btn btn-success mt-3" type="submit">
                START!
              </button>
            </div>
          </form>
          <div className="col-8 d-grid gap-2 mx-auto">
            <button className="btn btn-primary mt-3" onClick={toLogin}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
