export const fetchPodcasts = async () => {
    try {
      const response = await fetch('https://podcast-api.netlify.app');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      // Handle errors (e.g., return an empty array or throw a custom error)
    }
  };

  export const fetchGenre = async (genreId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching genre:', error);
      // Handle errors (e.g., return null or throw a custom error)
    }
  };

  export const fetchShow = async (showId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching show:', error);
      // Handle errors (e.g., return null or throw a custom error)
    }
  };