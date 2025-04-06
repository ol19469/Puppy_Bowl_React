import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("bench");
  const [img, setImg] = useState("");
  const [teamID, setTeamID] = useState("");

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch initial players if needed
    const fetchPlayers = async () => {
      const res = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT/players"
      );
      const result = await res.json();
      setPlayers(result.data.players);
    };
    fetchPlayers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlayer = {
      name,
      breed,
      status,
      imageUrl: img,
      teamId: teamID ? Number(teamID) : undefined,
    };

    try {
      const response = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT/players",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlayer),
        }
      );

      const result = await response.json();
      console.log("API response:", result);

      if (result.success) {
        alert("Player added!");

        // Add new player to list without refetch
        setPlayers([...players, result.data.newPlayer]);

        // Clear form
        setName("");
        setBreed("");
        setStatus("bench");
        setImg("");
        setTeamID("");
      } else {
        alert("API Error: " + result.error.message);
      }
    } catch (err) {
      console.error("Network or API error:", err);
    }
  };

  return (
    <>
      <form id="addPlayerForm" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            id="playerName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Breed:
          <input
            type="text"
            id="playerBreed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </label>
        <label>
          Status:
          <select
            id="playerStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="bench">Bench</option>
            <option value="field">Field</option>
          </select>
        </label>
        <label>
          Image URL:
          <input
            type="text"
            id="playerImageUrl"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </label>
        <label>
          Team ID:
          <input
            type="number"
            id="playerTeamId"
            value={teamID}
            onChange={(e) => setTeamID(e.target.value)}
          />
        </label>
        <button type="submit">Add Player</button>
      </form>

      <h2>Players</h2>
      <div className="puppy-grid">
        {players.map((player) => (
          <Link
            to={`/players/${player.id}`}
            key={player.id}
            className="puppy-card"
          >
            {player.imageUrl && (
              <img
                src={player.imageUrl}
                alt={player.name}
                className="puppy-img"
              />
            )}
            <h3>{player.name}</h3>
          </Link>
        ))}
      </div>
    </>
  );
}
