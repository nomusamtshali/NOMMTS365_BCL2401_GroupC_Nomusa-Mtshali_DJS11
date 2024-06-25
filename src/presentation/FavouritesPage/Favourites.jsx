import { useEffect, useState } from "react";

export const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  const removeFavourite = (podcastId, episode) => {
    const updatedFavourites = favourites.filter(
      (show) => !(show.podcastId === podcastId && show.episode === episode)
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <>
      <h1 className="title">Favourite Episodes: </h1>
      {favourites.length === 0 ? (
        <p className="title-info">No favourite episodes yet.</p>
      ) : (
        favourites.map((show) => (
          <div className="card-container">
            <div className="podcast-card">
              <img src={show.image} alt={show.title} />
              <div className="podcast-info">
                <h3>{show.title}</h3>
                <h4>{show.episode.title}</h4>
                <p>{show.episode.description}</p>
                <p>Episode: {show.episode}</p>
                <audio controls src={show.episode.file}></audio>
                <button onClick={() => removeFavourite(show.podcastId, show.episode)}>
                  Remove from Favourites
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};
