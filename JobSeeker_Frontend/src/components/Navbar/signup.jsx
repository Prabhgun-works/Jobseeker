import { useState } from "react";

import "./signup.css"; 
import { useUser } from "../../context.jsx";

// It uses the useUser hook from the UserContext to access the setUser function and update the user state with the new user data.
// It also saves the user data to local storage and displays a modal with a success message when the form is submitted.

export default function SignUp() {
  const {setUser} = useUser();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [expertise, setExpertise] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setDialogOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userName,
          email, 
          password,
          image,
          expertise,
          qualifications,
          experience
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Signup successful! Please login.");
      } else {
        setMessage(data.message || "Signup failed. Please try again.");
        if (data.errors) {
          setMessage(Object.values(data.errors).join(", "));
        }
      }
    } catch (error) {
      setMessage("An error occurred during signup. Please try again later.");
    }
    
    setDialogOpen(true);
  };

  const closeModal = () => {
    setDialogOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
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
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          placeholder="Set Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          required
        />
        <input
          placeholder="Area of Expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          type="text"
        />
        <input
          placeholder="Qualifications"
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          type="text"
        />
        <input
          placeholder="Experience in"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          type="text"
        />
        <button type="submit">Create Account</button>
      </form>

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
