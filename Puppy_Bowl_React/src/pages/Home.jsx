import { Link } from "react-router-dom";

export default function Home({ players }) {
  return (
    <div>
      <h1>Puppy Bowl Players</h1>
      <div className="puppy-grid">
        {players.map((player) => (
          <Link to={`/players/${player.id}`} className="puppy-card">
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
    </div>
  );
}
