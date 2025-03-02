import coursesData from "../../data/courses.json"
import "./Courses.css"

// this component displays a list of available courses that the user can enroll in.
// The component uses the coursesData from the courses.json file to populate the list of courses.

// The handleEnroll function logs the course id to the console when the user enrolls in a course.
const CoursesPage = () => {
  const { courses } = coursesData

  const userEnrolled = []

  const handleEnroll = (courseId) => {
    console.log(`Enrolled in course ${courseId}`)
  }

  return (
    <div className="courses-page">
      <h1>Available Courses</h1>

      <div className="courses-list">
        {courses.map((course) => {
          const isEnrolled = userEnrolled.includes(course.id)

          return (
            <div key={course.id} className="course-card">
              <div className="course-info">
                <h2>{course.name}</h2>
                <p className="enrolled-count">{course.enrolled} users enrolled</p>
                <p className="course-description">{course.description}</p>
              </div>

              <button
                className={`enroll-course-btn ${isEnrolled ? "enrolled" : ""}`}
                onClick={() => handleEnroll(course.id)}
                disabled={isEnrolled}
              >
                {isEnrolled ? "Enrolled" : "Enroll Now"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CoursesPage

