import React, { useState } from "react";
import coursesData from '/src/data/courses.json';
import "./Courses.css";

const CoursesPage = () => {
  const { courses } = coursesData;
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  const userEnrolled = [];

  const handleEnroll = (courseId) => {
    setEnrolledCourse(courseId);
  };

  const closeDialog = () => {
    setEnrolledCourse(null);
  };

  return (
    <div className="courses-page">
      <h1>Available Courses</h1>

      <div className="courses-list">
        {courses.map((course) => {

          return (
            <div key={course.id} className="course-card">
              <div className="course-info">
                <h2>{course.name}</h2>
                <p className="enrolled-count">{course.enrolled} users enrolled</p>
                <p className="course-description">{course.description}</p>
              </div>

              <button
                className={"course-btn "}
                onClick={() => handleEnroll(course.id)}
              >Enroll Now
              </button>
            </div>
          );
        })}
      </div>

      {enrolledCourse && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>Enrollment Confirmation</h2>
            <p>You have successfully enrolled in the course with ID: {enrolledCourse}</p>
            <button onClick={closeDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
