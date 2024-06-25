import { Link, NavLink } from "react-router-dom";
import "./Header.css"; // Make sure to import the CSS file
import { MdOutlineLibraryMusic } from "react-icons/md";
import { BsBookmarkHeart } from "react-icons/bs";
import { TbMusicSearch } from "react-icons/tb";

export const Header = () => {
  return (
    <header className="top">
      <div className="header-left">
        <Link className="header" to="/">
          <img className="icon" src="sound.png" alt="PodPulse Icon" /> PodPulse
        </Link>
      </div>
      <nav className="navbar">
        <NavLink className="nav-elements" to="/library">
        <MdOutlineLibraryMusic className="nav-icon" />Library
        </NavLink>
        <NavLink className="nav-elements" to="/favourites">
        <BsBookmarkHeart className="nav-icon" /> Favourites
        </NavLink>
        <NavLink className="nav-elements" to="/search">
        <TbMusicSearch className="nav-icon" /> Search
        </NavLink>
      </nav>
    </header>
  );
};