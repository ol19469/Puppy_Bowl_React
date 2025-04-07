import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp({ addPlayer }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("bench");
  const [img, setImg] = useState("");
  const [teamID, setTeamID] = useState("");
  const navigate = useNavigate();

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

      if (result.success) {
        addPlayer(result.data.newPlayer); // ✅ adds it to state in App
        alert("Player added!");
        navigate("/"); // ✅ go to homepage
      } else {
        alert("API Error: " + result.error.message);
      }
    } catch (err) {
      console.error("Network or API error:", err);
    }
  };

  return (
    <form id="addPlayerForm" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Breed:
        <input
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="bench">Bench</option>
          <option value="field">Field</option>
        </select>
      </label>
      <label>
        Image URL:
        <input value={img} onChange={(e) => setImg(e.target.value)} />
      </label>
      <label>
        Team ID:
        <input
          type="number"
          value={teamID}
          onChange={(e) => setTeamID(e.target.value)}
        />
      </label>
      <button type="submit">Add Player</button>
    </form>
  );
}
