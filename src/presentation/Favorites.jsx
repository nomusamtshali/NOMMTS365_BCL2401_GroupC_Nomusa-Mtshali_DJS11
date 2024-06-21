import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css"; // Import your CSS for styling

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      setFavorites(JSON.parse(favoritesFromStorage));
    }
  }, []);

  return (
    <>
      <h1>Favorite Episodes</h1>
      {favorites.length === 0 ? (
        <p>No favorite episodes yet.</p>
      ) : (
        favorites.map((show) => (
          <Link to={`/podcast/${show.podcastId}`} key={show.episode}>
            <div className="card-container">
              <div className="podcast-card">
                <img src={show.image} alt={show.title} />
                <div className="podcast-info">
                  <h3>{show.title}</h3>
                  <p>{show.description}</p>
                  <p>Episode: {show.episode}</p>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </>
  );
};
