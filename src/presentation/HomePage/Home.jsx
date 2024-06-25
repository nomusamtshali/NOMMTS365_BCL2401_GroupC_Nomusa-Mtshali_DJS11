import { Carousel } from "../../components/CarouselComp/Carousel";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to PodPulse</h1>
      <p>Discover and listen to the latest podcasts. Enjoy curated collections and recommendations just for you!</p>
      <Carousel />
    </div>
  );
};