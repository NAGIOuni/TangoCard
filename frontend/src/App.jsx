import React, { useContext } from "react";
import Topbar from "./components/Topbar/Topbar";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Show from "./pages/Show/Show";
import Card from "./pages/Card/Card";
import Word from "./pages/Word/Word";
import NewWord from "./pages/NewWord/NewWord";
import NewCard from "./pages/NewCard/NewCard";
import { AuthContext } from "./state/AuthContext";
import EditWord from "./pages/EditWord/EditWord";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/show" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/show" /> : <Register />}
        />
        <Route path="/show" element={user ? <Show /> : <Login />} />
        <Route path="/card" element={user ? <Card /> : <Login />} />
        <Route path="/word" element={user ? <Word /> : <Login />} />
        <Route path="/newWord" element={user ? <NewWord /> : <Login />} />
        <Route path="/newCard" element={user ? <NewCard /> : <Login />} />
        {/* <Route path="/editWord" element={user ? <EditWord /> : <Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
