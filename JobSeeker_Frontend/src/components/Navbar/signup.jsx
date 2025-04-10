import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css"; 
import { useUser } from "../../context.jsx";

export default function SignUp() {
  const {setUser} = useUser();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [expertise, setExpertise] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
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
      const formData = new FormData();
      formData.append('name', userName);
      formData.append('email', email);
      formData.append('password', password);
      if (image) {
        formData.append('image', image);
      }
      formData.append('expertise', expertise);
      formData.append('qualifications', qualifications);
      formData.append('experience', experience);

      console.log('Attempting signup with:', { email, name: userName });
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      console.log('Signup response:', data);
      
      if (response.ok) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Update context
        setUser(data.user);
        
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message || "Signup failed. Please try again.");
        if (data.errors) {
          setMessage(Object.values(data.errors).join(", "));
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
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
    <div className="signup-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="profile-pic"
              style={{ marginTop: '10px' }}
            />
          )}
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Expertise</label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Qualifications</label>
          <textarea
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Experience</label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {dialogOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={stopPropagation}>
            <h3>{message}</h3>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
} 