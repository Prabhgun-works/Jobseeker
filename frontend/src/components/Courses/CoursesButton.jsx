import React from 'react';
import { useNavigate } from "react-router-dom"
import coursesData from "../../data/courses.json"
import "./Courses.css"

const CourseButtons = () => {
  const navigate = useNavigate()
  const { courses } = coursesData

  const handleEnrollClick = () => {
    navigate("/courses")
  }

  return (
    <div className="courses-section">
      <h2>Skill Up with Our Courses</h2>

      <div className="course-buttons">
        {courses.map((course) => (
          <button key={course.id} className="course-btn" 
          
          onClick={() => console.log(`Clicked on ${course.name}`)}>
            {course.name}
          </button>
        ))}
      </div>

      <button className="enroll-btn" onClick={handleEnrollClick}>
        Enroll Courses
      </button>
    </div>
  )
}

export default CourseButtons

