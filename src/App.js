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
          <Link className="nav-link" to="/WishlistHome">Wishlist</Link>
          <Link className="nav-link" to="/GiftIdeas">Gift Ideas</Link>
          <Link className="nav-link" to="/LoginForm">Log In</Link>
          <Link className="nav-link" to="/SignUpForm">Sign up</Link>
        </nav>
        <div className="app-instructions">
          <h1>Welcome to THE Wishlist</h1>
          <h1>Convenient. Simple. *insert third adjective* </h1>
          <h3>If you no longer want to deal with paper lists, then there are plenty of other options. Why not another? Why not ours?</h3>
          <p>Here you can create a wishlist and share it with your friends and family.Like any wishlist should.</p>
          <p>Need some gift ideas? We got you covered. Check out our <Link to="/GiftIdeas">Gift Ideas</Link> page.</p>
          <p></p>
          <p>To get started you can create your account <Link to="/SignUpForm">here</Link></p>
          <p>Already a loyal consumer? Login to your account already then <Link to="/LoginForm">here</Link>.(please)</p>
        </div>
        <Routes>
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
