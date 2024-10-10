import './App.css'; // Import the CSS
import Signup from "./signup/Signup";
import Login from "./login/Login";
import HomePage from "./home/Homepage";  // Correct path
import AccountManager from "./components/AccountManager";
import GiftIdeas from "./components/GiftIdeas";
import csumbLogo from './images/csumb_logo.png'
import logo_img_placeholder from './images/logo_img_placeholder.png';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";  // Make sure to import Navigate

const user = localStorage.getItem("user");  // Checking if user is stored in localStorage
// ProtectedRoute component to protect routes
const ProtectedRoute = ({ children }) => {
  
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
          {/* Wishlist link should take you to login if not already logged in. Should come back to when backend setup. */}
          <Link className="nav-link" to="/HomePage">Your Wishlists</Link>
          <Link className="nav-link" to="/GiftIdeas">Gift Ideas</Link>
          <Link className="nav-link" to="/Login">Log In</Link>
          <Link className="nav-link" to="/Signup">Sign up</Link>
        </nav>
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/WishlistHome" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>} />
          <Route path="/" element={<LandingPage />} />

          <Route path="/GiftIdeas" element={<GiftIdeas />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          {user ? (
            <Route path="/HomePage" element={<HomePage />} />
          ) : (
            <Route path="/HomePage" element={<Navigate to="/Login" />} />
          )}
        </Routes>
      </div>
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



