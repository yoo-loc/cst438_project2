import './App.css'; // Import the CSS
import Signup from "./signup/Signup";
import Login from "./login/Login";
import HomePage from "./home/Homepage";  // Correct path
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home", // Route for the homepage
      element: <HomePage />,
    },
  ]);

  return (
    <div>
      <header className="navbar">
        <div className="logo">YOUR LOGO</div>
        <nav className="nav-links">
          <button className="nav-button" onClick={handleLoginClick}>
            Log In
          </button>
          <button className="nav-button signup-button" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </nav>
      </header>

      {/* Render forms based on the button clicks */}
      <div className="form-container">
        {showSignUp && <SignUpForm />}
        {showLogin && <LoginForm />}
      </div>
    </div>
  );
}

export default App;



