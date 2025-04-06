import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function PlayerDetail({ players, setPlayers }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const res = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT/players/${id}`
        );
        const result = await res.json();
        setPlayer(result.data.player);
      } catch (err) {
        console.error("Error fetching player:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayer();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this player?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-MT-WEB-PT/players/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (result.success) {
        alert("Player deleted!");

        // ✅ Remove the player from the list
        const updatedPlayers = players.filter((p) => p.id !== Number(id));
        setPlayers(updatedPlayers);

        // Redirect
        navigate("/");
      } else {
        alert("Failed to delete player.");
      }
    } catch (err) {
      console.error("Error deleting player:", err);
    }
  };

  if (loading) return <p>Loading player...</p>;
  if (!player) return <p>Player not found.</p>;

  return (
    <div className="player-detail">
      <h2>{player.name}</h2>
      {player.imageUrl && (
        <img src={player.imageUrl} alt={player.name} className="puppy-img" />
      )}
      <p>
        <strong>Breed:</strong> {player.breed}
      </p>
      <p>
        <strong>Status:</strong> {player.status}
      </p>
      {player.teamId && (
        <p>
          <strong>Team ID:</strong> {player.teamId}
        </p>
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleDelete} className="delete-button">
          🗑️ Delete Player
        </button>
        <br />
        <Link to="/" className="back-link">
          ← Back to Players
        </Link>
      </div>
    </div>
  );
}
