import './App.css'; // Import the CSS
import Signup from "./signup/Signup";
import Login from "./login/Login";
import HomePage from "./home/Homepage";  // Correct path
import WishlistHome from "./components/WishlistHome";
import GiftIdeas from "./components/GiftIdeas";
import csumbLogo from './images/csumb_logo.png'
import logo_img_placeholder from './images/logo_img_placeholder.png';
import LandingPage from './components/LandingPage';
import Clothing from './components/Clothing'; 
import Books from './components/Books';
import Games from './components/Games'; // Import Games component
import Gadgets from './components/Gadgets'; // Import Games component
import Giftcard from './components/giftcard'; // Import Games component


import PersonalWishlist from './components/PersonalWishlist';  // Import PersonalWishlist

import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";  // Make sure to import Navigate

// ProtectedRoute component to protect routes
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");  // Checking if user is stored in localStorage
  if (!user) {
    return <Navigate to="/Login" />;  // Redirect to Login if user is not authenticated
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link className="nav-link" to="/"><img src={logo_img_placeholder} alt="placehold"/></Link>
          

          <Link className="nav-link" to="/Login">Log In</Link>
          <Link className="nav-link" to="/Signup">Sign up</Link>
        </nav>
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/WishlistHome" element={
            <ProtectedRoute>
              <WishlistHome />
            </ProtectedRoute>
          } />

          <Route path="/" element={<LandingPage />} />
          <Route path="/GiftIdeas" element={<GiftIdeas />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/books" element={<Books />} />
          <Route path="/videogames" element={<Games />} /> {/* Corrected route */}

          <Route path="/clothing" element={<Clothing />} />
          <Route path="/Gadgets" element={<Gadgets />} />
          <Route path="/giftcard" element={<Giftcard />} />


          <Route path="/PersonalWishlist" element={<ProtectedRoute><PersonalWishlist /></ProtectedRoute>} />
        </Routes>
      </div>
      <br></br>
      <br></br>
      <footer>
        CST438 Software Engineering.2024© Elizarraraz, Roland, Guido, Tan.
        <div></div>
        <b>Disclaimer:</b> It is used for academic purposes only.
        <div></div>
        <img src={csumbLogo} alt="CSUMB Logo" />
      </footer>
    </Router>
  );
}

export default App;
