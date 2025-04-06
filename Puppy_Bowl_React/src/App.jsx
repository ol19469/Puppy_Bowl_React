import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import PlayerDetail from "./pages/PlayerDetail";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT/players")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.data.players);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/SignUp">Sign Up</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home players={players} />} />
        <Route
          path="/SignUp"
          element={<SignUp players={players} setPlayers={setPlayers} />}
        />
        <Route
          path="/players/:id"
          element={<PlayerDetail players={players} setPlayers={setPlayers} />}
        />
      </Routes>
    </div>
  );
}

export default App;
