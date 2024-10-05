import './App.css'; // Import the CSS
import Signup from "./signup/Signup";
import Login from "./login/Login";
import HomePage from "./home/Homepage";  // Correct path
import WishlistHome from "./components/WishlistHome";
import GiftIdeas from "./components/GiftIdeas";
import csumbLogo from './images/csumb_logo.png';
import logo_img_placeholder from './images/logo_img_placeholder.png';
import  { BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link className="nav-link" to="/"><img src={logo_img_placeholder} alt="placehold"/></Link>
          {/* Wishlist link should take you to login if not already logged in. Should come back to when backend setup. */}
          <Link className="nav-link" to="/WishlistHome">Wishlists</Link>
          <Link className="nav-link" to="/GiftIdeas">Gift Ideas</Link>
          <Link className="nav-link" to="/Login">Log In</Link>
          <Link className="nav-link" to="/Signup">Sign up</Link>
        </nav>
        <Routes>
        <Route path="/" element={<LandingPage />} />
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
