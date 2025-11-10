import React from 'react';

import { useNavigate } from "react-router-dom"
import communityData from "../../data/Community.json"
import "./Community.css"

       {/* useNavigate : Dynamic navigation based on data: */}


const CommunityDialog = ({ isOpen, onClose  }) => {
  const navigate = useNavigate()
  const { communities } = communityData

  if (!isOpen) return null

  const handleJoinClick = () => {
    onClose()
    navigate("/join-community")
  }

  return (
    <div className="community-dialog-overlay">
      <div className="community-dialog">
        <div className="dialog-header">
          <h2>Popular Communities</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="communities-list">
          {communities.map((community) => (
            <div key={community.id} className="community-preview">
              <div className="community-header">
                <h3>{community.name}</h3>
                <span className="member-count">{community.members} members</span>
              </div>

              <div className="community-messages">
                {community.messages.map((msg, idx) => (
                  <div key={idx} className="message">
                    <div className="message-header">
                      <span className="user-name">{msg.user}</span>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="dialog-footer">
          <button className="join-btn" onClick={handleJoinClick}>
            Join Community
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommunityDialog

