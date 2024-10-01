import './App.css'; // Import the CSS
import Signup from "./signup/Signup";
import Login from "./login/Login";
import HomePage from "./home/Homepage";  // Correct path
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WishlistHome from "./components/WishlistHome";
import GiftIdeas from "./components/GiftIdeas";
import csumbLogo from './images/csumb_logo.png';
import  { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link className="nav-link" to="/WishlistHome">Wishlists</Link>
          <Link className="nav-link" to="/GiftIdeas">Gift Ideas</Link>
          <Link className="nav-link" to="/Login">Log In</Link>
          <Link className="nav-link" to="/Sign">Sign up</Link>
        </nav>
        <Routes>
        <Route path="/HomePage" element={<HomePage />} />
          <Route path="/WishlistHome" element={<WishlistHome />} />
          <Route path="/GiftIdeas" element={<GiftIdeas />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
      <footer>
          CST438 Software Engineering.2024© Elizarraraz, Roland, Guido, Tan.
          <div></div>
          <b>Disclaimer:</b>It is used for academic purposes only.
          <div></div>
          <img src={csumbLogo} alt="CSUMB Logo" />
      </footer>
    </Router>
  );
}

export default App;
