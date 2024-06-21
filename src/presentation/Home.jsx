import { useEffect, useState } from "react";
import { fetchPodcasts } from "../services/api";
import { Link, useSearchParams } from "react-router-dom";
import { genreInfo } from "../services/Genres";
import { auth, db } from "../services/firebaseConfig";
import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from "firebase/firestore";
import "../index.css"

export const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPodcasts();
        setPodcasts(data);
        setSorted(data); // Initialize sorted data with fetched data

        // Load favorites from Firestore
        if (auth.currentUser) {
          const q = query(collection(db, "favorites"), where("userId", "==", auth.currentUser.uid));
          const querySnapshot = await getDocs(q);
          const favs = querySnapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
          setFavorites(favs);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const genreFilter = searchParams.get('genre');
    if (genreFilter) {
      const filteredPodcasts = podcasts.filter(podcast => podcast.genre === genreFilter);
      setSorted(filteredPodcasts);
    } else {
      setSorted(podcasts);
    }
  }, [searchParams, podcasts]);

  const sortData = (value) => {
    let sortedPodcasts = [...sorted]; // Create a copy of the podcast array

    if (value === "Newest") {
      sortedPodcasts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (value === "Oldest") {
      sortedPodcasts.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } else if (value === "A-Z") {
      sortedPodcasts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "Z-A") {
      sortedPodcasts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setSorted(sortedPodcasts);
  };

  const toggleFavorite = async (episode) => {
    const user = auth.currentUser;
    if (!user) return;
    
    const favIndex = favorites.findIndex(fav => fav.id === episode.id);
    if (favIndex >= 0) {
      // Remove from favorites
      const favDoc = favorites[favIndex];
      await deleteDoc(doc(db, "favorites", favDoc.docId));
      setFavorites(favorites.filter(fav => fav.id !== episode.id));
    } else {
      // Add to favorites
      const favDoc = await addDoc(collection(db, "favorites"), {
        ...episode,
        userId: user.uid
      });
      setFavorites([...favorites, { ...episode, docId: favDoc.id }]);
    }
  };

  const buttonGenre = Object.keys(genreInfo).map((key) => (
    <button key={key} className="genre-button" onClick={() => setSearchParams({ genre: key })}>
      {genreInfo[key]}
    </button>
  ));

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!podcasts.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="sort-btns">
        <button onClick={() => sortData("A-Z")}>A-Z</button>
        <button onClick={() => sortData("Z-A")}>Z-A</button>
        <button onClick={() => sortData("Newest")}>Newest</button>
        <button onClick={() => sortData("Oldest")}>Oldest</button>
      </div>

      <div>
        {buttonGenre}
      </div>

      {sorted.map((show) => (
        <div key={show.id} className="card-container">
          <div className="podcast-card">
            <Link to={`/${show.id}`}><img src={show.image} alt={show.title} /></Link>
            <div className="podcast-info">
              <h3>{show.title}</h3>
              <p>Seasons: {show.seasons}</p>
              <p>Last updated: {new Date(show.updated).toLocaleString()}</p>
              {/* <button onClick={() => toggleFavorite(show)}>
                {favorites.some(fav => fav.id === show.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
