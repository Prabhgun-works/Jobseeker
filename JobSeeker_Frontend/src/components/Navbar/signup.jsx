import { useState } from "react";
import "./signup.css"; 
import { useUser } from "../../context";

// It uses the useUser hook from the UserContext to access the setUser function and update the user state with the new user data.
// It also saves the user data to local storage and displays a modal with a success message when the form is submitted.

export default function SignUp() {
  const {setUser} = useUser();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0]; // this file is the image file , we are getting the first file from the array of files , as we are only allowing one file to be uploaded.
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault(); 
  
  setMessage(`${userName}, your account has been created!`);
    const userData = { userName, image, password };

    setUser(userData); 
    localStorage.setItem("user", JSON.stringify(userData)); 

  setMessage(`${userName}, your account has been created!`);
  setDialogOpen(true);      
  };
  const closeModal = () => {
    setDialogOpen(false); // this will close the modal
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); // this will stop the event from bubbling up the DOM tree.
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>

        {image && <img src={image} alt="Profile" width="200" className="profile-pic" />}
        <input type="file" accept="image/*" onChange={handleChange} />

        <input
          placeholder="Set Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          required
        />
        <input
          placeholder="Set Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <input placeholder="Confirm Password" type="password" required />
        <input placeholder="Area of Expertise" type="text" />
        <input placeholder="Qualifications" type="text" />
        <input placeholder="Experience in" type="text" />
        <button type="submit">Create Account</button>
      </form>

      {dialogOpen && ( // this will show the modal only when dialogOpen is true
        <div className="modal-backdrop" onClick={closeModal}> 
        
          <div className="modal" onClick={stopPropagation}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
