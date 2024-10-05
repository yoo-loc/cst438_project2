import react from 'react';
import  {Link} from "react-router-dom";
const LandingPage = () => {
  // The links to the signup and login pages should send an alert to user they're already logged in and redirect them to the WishlistHome page.
  // Page needs to be given styles.
    return (
        <div className="app-instructions">
          <h1>Welcome to THE Wishlist</h1>
          <h2>Convenient. Simple. *insert third adjective* </h2>
          <h3>If you no longer want to deal with paper lists, then there are plenty of other options. Why not another? Why not ours?</h3>
          <p>Here you can create a wishlist and share it with your friends and family.Like any wishlist should.</p>
          <p>Need some gift ideas? We got you covered. Check out our <Link to="/GiftIdeas">Gift Ideas</Link> page.</p>
          <p></p>
          <p>To get started you can create your account <Link to="/Signup">here</Link></p>
          <p>Already a loyal consumer? Login to your account already then <Link to="/Login">here</Link>.(please)</p>
        </div>
    );
}
export default LandingPage;