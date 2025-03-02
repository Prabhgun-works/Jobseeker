import { useEffect } from "react";
import { useUser } from "../../context";
import './profile.css';

export default function Profile() {
  const { user, setUser } = useUser();

  //Fetch user data from local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); 
    }
  }, [setUser]); 

  return (
    <div className='h-screen  py-4 flex gap-8'> 
  
      <div className="profile">
      <h2> Profile</h2>
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
//this Profile component It uses the useUser from Context.jsx to access the user state and setUser function from the UserContext.
// It also uses the useEffect hook to retrieve the user data from local storage when the component mounts.
