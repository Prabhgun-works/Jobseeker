import { Link } from "react-router-dom";

export default function Navbar() {
  
  return (
    <div className="container">
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/profile">Profile</Link>
      <Link className="link" to="/login">Login</Link>
      <Link className="link" to="/signup">SignUp</Link>
        
    </div>
  );
}
// This Navbar component is a simple navigation bar that includes links to different pages of the application.
// It uses the Link component from React Router to navigate between pages.