import React from 'react';
import { useState } from 'react' ;

import './home.css';
import CourseButtons from '../Courses/CoursesButton';
import CommunityDialog from '../Community/CommunityDialog';


export default function Home() {
  // this is dummy data for featured Jobs

  const[search , setSearch] = useState("");

  const jobs = [
    { title: "Frontend Developer", company: "TechCorp", location: "New York, NY" },
    { title: "Backend Engineer", company: "DataSystems", location: "San Francisco, CA" },
    { title: "Full Stack Developer", company: "WebSolutions", location: "Austin, TX" },
    { title: "UX Designer", company: "DesignHub", location: "Seattle, WA" },
    { title: "DevOps Engineer", company: "CloudTech", location: "Chicago, IL" },
    { title: "Data Scientist", company: "AllInnovate", location: "Boston, MA" },
    { title: "Human Resourse Manager ", company: "PineApple", location: "Mumbai, IN" },

  ];

    // this function filters the jobs based on the user input {Location or Title }in Searchbar
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) || 
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  //this dialog is for the community section
  const [showCommunityDialog, setShowCommunityDialog] = useState(false)

  const openCommunityDialog = () => {
    setShowCommunityDialog(true)
  }

  const closeCommunityDialog = () => {
    setShowCommunityDialog(false)
  }


  return (
    <div>
      <div className='hero-container'>
      </div>

      <div className='SearchBar'>
      <input type='text' placeholder='Search... ' value={search} 
      onChange={(e)=> setSearch(e.target.value)} className='search-bar'/> 
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
        ))}     
      </div>
      
      <div className="home-container">
        <div className="hero-section"></div>

        <div className="community-section">

          <h2>Join Our Community</h2>
          <p>Connect with other job seekers, share tips, and get advice from industry professionals.</p>
          
          <button onClick={openCommunityDialog}>
            Browse Communities
          </button>
        </div>

        <CourseButtons />

        <CommunityDialog isOpen={showCommunityDialog} onClose={closeCommunityDialog} />
        {/* showCommunityDialog and CloseCom are functions  */}

      </div>
    </div>
  );
}
//The search bar filters the list of jobs based on the user input. The community section includes a button to open a dialog for browsing different communities.
//