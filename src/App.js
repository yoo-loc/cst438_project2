import Signup from "./signup/Signup";
import Login from "./login/Login";
import HomePage from "./home/Homepage";  // Correct path
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom"; // Simplified router imports

function App() {
  return (
    <Router>
      <div>

        {/* Routes for Signup, Login, and HomePage */}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
