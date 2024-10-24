//import react from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";
const LandingPage = () => {
  // The links to the signup and login pages should send an alert to user they're already logged in and redirect them to the WishlistHome page.
  // Page needs to be given styles.
  const navigate = useNavigate();



  const toLogin = () => {
    navigate('/Login');
  };

    return (
        <div className="app-home">
          <div className='mainContent'>
          <h1>Welcome to our Wishlist</h1>
          <h1>Convenient. Simple. Personalized. </h1>
               

          <button onClick={toLogin} className="getStartedbtn">Get Started</button>

          {/* <p>Here you can create a wishlist and share it with your friends and family.Like any wishlist should.</p>
          <p>Need some gift ideas? Check out our <Link to="/GiftIdeas">Gift Ideas</Link> page.</p>
          <p></p>
          <p>To get started, create your account <Link to="/Signup">here</Link></p>
          <p>Already a loyal customer? Login <Link to="/Login">here</Link>.</p> */}
          </div>
        </div>
    );
}
export default LandingPage;