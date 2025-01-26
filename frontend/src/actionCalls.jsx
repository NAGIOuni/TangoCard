import axios from "axios";

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APIURL}/auth/login`,
      user
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
};

export const logoutCall = (user, dispatch) => {
  dispatch({ type: "LOGOUT" });
};
