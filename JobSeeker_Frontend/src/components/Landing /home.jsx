import { useState } from 'react' ;
import './home.css';
import img from '../../assets/HeroImg.png';
import CourseButtons from '../Courses/CoursesButton';
import CommunityDialog from '../Community/CommunityDialog';


export default function Home() {
  
  const[query , setQuery] = useState("");
  const jobs = [
    { title: "Frontend Developer", company: "TechCorp", location: "New York, NY" },
    { title: "Backend Engineer", company: "DataSystems", location: "San Francisco, CA" },
    { title: "Full Stack Developer", company: "WebSolutions", location: "Austin, TX" },
    { title: "UX Designer", company: "DesignHub", location: "Seattle, WA" },
    { title: "DevOps Engineer", company: "CloudTech", location: "Chicago, IL" },
    { title: "Data Scientist", company: "AllInnovate", location: "Boston, MA" },
  ];
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );const [showCommunityDialog, setShowCommunityDialog] = useState(false)

  const openCommunityDialog = () => {
    setShowCommunityDialog(true)
  }

  const closeCommunityDialog = () => {
    setShowCommunityDialog(false)
  }


  return (
    <div>
      <input type='text' placeholder='Search... ' value={query} 
      onChange={(e)=> setQuery(e.target.value)} className='search-bar'/> 
      
      <div className='hero-container'>
        <img src={img} className='hero-img' alt='HeroImg'></img>
      </div>
      <h4>Featured Jobs</h4>

    <div className="job-list">

        {filteredJobs.map((job, index) => (
          <div className="job-card" key={index}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <button className="view-details">View Details</button>
          </div>
        ))}      </div>
        <div className="home-container">
      <div className="hero-section">
     
      </div>
{/* 

      {/* Community Section */}
      <div  className="community-section" >
        <h2>Join Our Community</h2>
        <p>Connect with other job seekers, share tips, and get advice from industry professionals.</p>
        <button onClick={openCommunityDialog}>
          Browse Communities
        </button>
      </div>

      <CourseButtons />

      <CommunityDialog isOpen={showCommunityDialog} onClose={closeCommunityDialog} />
    </div>
    </div>
  );
}
