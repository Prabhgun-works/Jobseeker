import React from 'react';
import { useState, useEffect } from 'react';
import { useUser } from '../../context.jsx';
import './profile.css';

export default function Profile() {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState('bio');
  const [currentUser, setCurrentUser] = useState(null);

  // Simple sections for profile
  const sections = [
    { id: 'bio', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' }
  ];

  // Default user data if none exists
  const defaultUser = {
    userName: 'User',
    image: 'https://via.placeholder.com/150', // Using a placeholder image service
    expertise: 'Professional',
    bio: 'Add your bio here to tell employers about yourself.',
    skills: [],
    experience: []
  };

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(defaultUser);
    }
  }, [user]);

  if (!currentUser) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img 
          src={currentUser.image || defaultUser.image} 
          alt="Profile" 
          className="profile-image"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = defaultUser.image;
          }}
        />
        <div className="profile-info">
          <h1 className="text-2xl font-bold">{currentUser.userName || currentUser.name}</h1>
          <p className="text-gray-600">{currentUser.expertise}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-nav">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="profile-content">
        {/* Bio Section */}
        {activeSection === 'bio' && (
          <div className="section-content">
            <h2>About Me</h2>
            <p className="bio-text">
              {currentUser.bio}
            </p>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="section-content">
            <h2>Skills</h2>
            <div className="skills-list">
              {currentUser.skills && currentUser.skills.length > 0 ? (
                currentUser.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    {skill}
                  </div>
                ))
              ) : (
                <p>No skills added yet. Add your skills to showcase your expertise.</p>
              )}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div className="section-content">
            <h2>Work Experience</h2>
            {currentUser.experience && currentUser.experience.length > 0 ? (
              currentUser.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h3 className="experience-title">{exp.title}</h3>
                  <p className="experience-company">{exp.company}</p>
                  <p className="experience-date">{exp.period}</p>
                  <p className="experience-description">{exp.description}</p>
                </div>
              ))
            ) : (
              <p>No experience added yet. Add your work experience to build your profile.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
