import { useState } from "react";
import "./signup.css"; 
import { useUser } from "../../context";

export default function SignUp() {
  const {setUser} = useUser();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault(); // Prevent form submission
  setMessage(`${userName}, your account has been created!`);
    const userData = { userName, image, password };

    setUser(userData); // Update context
    localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage

  setMessage(`${userName}, your account has been created!`);
  setDialogOpen(true);    
    setDialogOpen(true); // Open the modal
  };
  const closeModal = () => {
    setDialogOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevent click event from reaching the backdrop
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Profile Picture Preview */}
        {image && <img src={image} alt="Profile" width="200" className="profile-pic" />}
        <input type="file" accept="image/*" onChange={handleChange} />

        {/* User Inputs */}
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

      {/* Modal */}
      {dialogOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={stopPropagation}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
