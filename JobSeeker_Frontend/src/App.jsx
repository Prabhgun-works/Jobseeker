import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from "./context.jsx"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/home"
import Profile from "./components/Profile/profile" 
import Login from "./components/Navbar/Login"
import SignUp from "./components/Navbar/signup.jsx"
import JoinCommunity from "./components/Community/Community"
import CoursesPage from "./components/Courses/CoursesPage"
import Jobs from "./components/Jobs/Jobs"
import Applications from "./components/Applications/Applications"

import "./App.css"

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/join-community" element={<JoinCommunity />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/applications" element={<Applications />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </Router>
  )
}

export default App
// This App component sets up the main structure of the application using React Router for navigation. 
// It includes a UserProvider context to manage user state and renders a Navbar along with different routes for various pages like Home, Profile, Login, SignUp, JoinCommunity, and CoursesPage. 


  