import { Link, NavLink } from "react-router-dom";
import { auth, onAuthStateChanged } from "../services/firebaseConfig";
import { useState, useEffect } from "react";

export const Header = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  
  return (
    <header className="top">
      
      <Link className="header" to="/">PodPulse</Link>

      <nav className="navbar">

        <NavLink className="nav-elements" to="/favorites">Favourites</NavLink>

        {/* {user ? (
              <button onClick={() => auth.signOut()}>Logout</button>
            ) : ( <Link to="/login">Login</Link> )}

          <NavLink className="nav-elements"
            to="/search"
          >
            Search 
          </NavLink> */}

          {/* <Link to="login" className="login">
          <img 
            src={imageUrl}
            className="login-icon"/>
            </Link> */}


      </nav>
    </header>
  );
};
