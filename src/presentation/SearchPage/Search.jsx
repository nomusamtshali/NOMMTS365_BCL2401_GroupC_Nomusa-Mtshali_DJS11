import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import './Search.css';

export const Search = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]);
      return;
    }

    const fuse = new Fuse(podcasts, {
      keys: ['title', 'description', 'genre'], // Adjust keys based on podcast data structure
    });

    const results = fuse.search(searchQuery).map(result => result.item);
    setSearchResults(results);
  }, [searchQuery, podcasts]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for podcasts..."
        className="search-input"
      />
      <div className="results-container">
        {searchResults.map((podcast) => (
          <div
            key={podcast.id}
            className="podcasts-card"
            style={{ backgroundImage: `url(${podcast.image})` }}
          >
            <h2>{podcast.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};



