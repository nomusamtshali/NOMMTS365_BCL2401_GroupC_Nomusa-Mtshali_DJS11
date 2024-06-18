import { useEffect, useState } from "react";
import { Preview } from "../components/Card";
import { Navbar } from "../components/Navbar";
import { fetchPodcasts } from "../api";

export const Home = ({}) => {

  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPodcasts();
        setPodcasts(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

    return (
        <>
        <Navbar/>
        {podcasts?.map((show) => <Preview image={show.image} title={show.title} description={show.description}/>)}
        </>
    )
}

