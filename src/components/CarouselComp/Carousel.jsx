import { useEffect, useState } from "react";
import { fetchPodcasts } from "../../services/api";
import "./Carousel.css";

export const Carousel = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // keeps track of the index of the currently displayed podcast in the carousel.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPodcasts();
        setPodcasts(shuffleArray(data)); // shuffle the podcasts to display in random order
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    fetchData();
  }, []);

  // function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // function to handle automatic scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % podcasts.length);
    }, 3000); // change slide every 3 seconds
    return () => clearInterval(interval);
  }, [podcasts.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % podcasts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? podcasts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="carousel-wrapper">
        <div
          className="carousel-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {podcasts.map((podcast, index) => (
            <div key={index} className="carousel-item">
              <img src={podcast.image} alt={podcast.title} className="podcast-image" />
              <h3>{podcast.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};
