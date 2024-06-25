import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchShow } from "../../services/api";
import { RiHeartAddLine, RiHeartFill } from "react-icons/ri";
import './PodcastCard.css';

export const PodcastCard = () => {
  const [podcast, setPodcast] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShow(id);
        setPodcast(data);
        setSelectedSeason(data.seasons[0].season); // Set the first season as default
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  const isLiked = (episode) => { // checks whether a specific episode is already liked by the user based on the data stored in the browser's local storage.
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    return favourites.some(
      (like) =>
        like.episode === episode.episode &&
        like.season === episode.season &&
        like.podcastId === id
    );
  };

  const toggleLike = (episode) => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const episodeData = {
      podcastId: id,
      season: episode.season,
      episode: episode.episode,
      title: episode.title,
      description: episode.description,
      file: episode.file,
      image: episode.image, //updates the local storage accordingly and toggles the like icon displayed for the episode.
    };

    if (isLiked(episode)) {
      const newFavourites = favourites.filter(
        (like) =>
          like.episode !== episode.episode ||
          (like.season !== episode.season && like.podcastId !== id)
      );
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    } else {
      favourites.push(episodeData);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    setPodcast((prevShow) => ({ // arrow function is passed to setPodcast, which takes the previous state (prevShow) as an argument and returns the new state.
      ...prevShow,
      seasons: prevShow.seasons.map((season) => ({ 

        ...season,
        episodes: season.episodes.map((ep) =>
          ep.episode === episode.episode
            ? { ...ep, liked: !isLiked(episode) }
            : ep
        ),
      })),
    }));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!podcast) {
    return <div>Loading...</div>;
  }

  const filteredEpisodes = selectedSeason
    ? podcast.seasons.find((season) => season.season === selectedSeason)?.episodes || [] // array method used to find the first element in an array 
    : podcast.seasons.flatMap((season) => season.episodes); // array method used to map each element of an array using a mapping function and then flatten the result into a new array. 
    // callbackFunction is passed to .flatMap, which extracts the episodes array from each season object

  return (
    <>
      <div className="show-detail-container">
        <h1 className="show-detail-container">{podcast.title}</h1>
        <p className="show-detail-description">{podcast.description}</p>

        <div className="season-dropdown">
          <label htmlFor="season-select">Select Season:</label>
          <select
            id="season-select"
            onChange={(e) => handleSeasonSelect(parseInt(e.target.value))}
            value={selectedSeason}
          >
            {podcast.seasons.map((season) => (
              <option key={season.season} value={season.season}>
                {season.title}
              </option>
            ))}
          </select>
        </div>

        {filteredEpisodes.map((episode) => (
          <div key={episode.episode} className="episode-container">
            <div className="show-card">
              <div className="show-information">
                <h3>{episode.title}</h3>
                <img src={episode.image} alt={episode.title} className="episode-image" />
                <p>{episode.description}</p>
                <audio controls src={episode.file}>
                  Your browser does not support the audio element.
                </audio>
                {isLiked(episode) ? (
                  <RiHeartFill
                    onClick={() => toggleLike(episode)}
                    className="icon"
                  />
                ) : (
                  <RiHeartAddLine
                    onClick={() => toggleLike(episode)}
                    className="icon"
                  />
                )}
              </div>
            </div>
          </div>
        ))};
      </div>
    </>
  );
};
