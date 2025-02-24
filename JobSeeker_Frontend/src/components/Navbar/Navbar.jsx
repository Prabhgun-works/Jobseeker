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