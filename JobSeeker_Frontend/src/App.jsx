import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { UserProvider } from "./context"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Landing /home"
import Profile from "./components/Profile/profile"
import Login from "./components/Navbar/Login"
import SignUp from "./components/Navbar/SignUp"
import JoinCommunity from "./components/Community/Community"
import CoursesPage from "./components/Courses/CoursesPage"

import "./App.css"

function App() {
  return (
    <Router>
      <UserProvider>
        <h1>JobSeeker</h1>
        <div className="navbar">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/join-community" element={<JoinCommunity />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App

