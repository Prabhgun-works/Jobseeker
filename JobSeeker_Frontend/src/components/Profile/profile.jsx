import { useState } from 'react';
import { useUser } from '../../context.jsx';
import './Profile.css';

export default function Profile() {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState('bio');

  // Simple sections for profile
  const sections = [
    { id: 'bio', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' }
  ];

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <img 
          src={user?.image || '/default-avatar.png'} 
          alt="Profile" 
          className="profile-image"
        />
        <div className="profile-info">
          <h1 className="text-2xl font-bold">{user?.userName}</h1>
          <p className="text-gray-600">{user?.expertise || 'Professional'}</p>
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
              {user?.bio || 'Add your bio here to tell employers about yourself.'}
            </p>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="section-content">
            <h2>Skills</h2>
            <div className="skills-list">
              {user?.skills?.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div className="section-content">
            <h2>Work Experience</h2>
            {user?.experience?.map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>{exp.title}</h3>
                <p className="company">{exp.company}</p>
                <p className="period">{exp.period}</p>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
