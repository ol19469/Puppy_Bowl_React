import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ players }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Puppy Bowl Players</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="puppy-grid">
        {filteredPlayers.length === 0 ? (
          <p>No puppies found.</p>
        ) : (
          filteredPlayers.map((player) => (
            <Link
              key={player.id}
              to={`/players/${player.id}`}
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
          ))
        )}
      </div>
    </div>
  );
}
