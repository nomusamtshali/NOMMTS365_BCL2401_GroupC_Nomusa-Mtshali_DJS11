import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from "./presentation/Home";
import { Favorites } from "./presentation/Favorites";
import { Layout } from "./components/Layout";
import { PodcastPreview } from "./components/PodcastPreview/PodcastPreview";
import { Login } from "./presentation/Login";
import { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./services/firebaseConfig"

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:id" element={<PodcastPreview />} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
