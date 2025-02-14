import { useEffect } from "react";
import { useUser } from "../../context";

import './profile.css';

export default function Profile() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Restore user data from localStorage
    }
  }, [setUser]); // Runs only when `setUser` changes

  return (
    <div >
      <h2> Profile</h2>
      <div className="profile">
      {user ? (
        <>
          <img className="profile-pic" src={user.image}  />
          <p> {user.userName}</p>
        </>
      ) : (
        <p>No user data available.</p>
      )}
      </div>
    </div>
  );
}
