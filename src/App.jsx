import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./presentation/HomePage/Home";
import { Library } from "./presentation/LibraryPage/Library";
import { Favourites } from "./presentation/FavouritesPage/Favourites";
import { Search } from "./presentation/SearchPage/Search";
import { PodcastCard } from "./components/PodcastCardComp/PodcastCard";


export default function App() {
  return (
    <>

<BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/:id" element={<PodcastCard />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}