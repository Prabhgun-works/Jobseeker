import React from 'react';

import { useState } from "react"
import communityData from "../../data/Community.json"
import "./Community.css"

const JoinCommunity = () => {
  const [activeTab, setActiveTab] = useState("popular")

  const [dialogVisible, setDialogVisible] = useState(false)
  const [dialogContent, setDialogContent] = useState("")

  const { communities, suggested } = communityData

  const handleJoin = (communityName) => {
    setDialogContent(`Joined community ${communityName}`)
    setDialogVisible(true)
  }

  const closeDialog = () => {
    setDialogVisible(false)
    setDialogContent("")
  }

  return (
    <div className="join-community-container">
      <h1>Join a Community</h1>

      <div className="community-tabs">
        <button  onClick={() => setActiveTab("popular")}>
          Popular
        </button>
        <button onClick={() => setActiveTab("recent")}>
          Recent
        </button>
        <button
          onClick={() => setActiveTab("suggested")}
        >
          Suggested for You
        </button>
      </div>

      <div className="communities-grid">
        {activeTab === "popular" &&
          communities.map((community) => (
            <div key={community.id} className="community-card">
              <h3>{community.name}</h3>
              <p>{community.members} members</p>
              <button className="join-community-btn" onClick={() => handleJoin(community.name)}>
                Join
              </button>
            </div>
          ))}

        {activeTab === "suggested" &&
          suggested.map((community) => (
            <div key={community.id} className="community-card">
              <h3>{community.name}</h3>
              <p>{community.members} members</p>
              <button className="join-community-btn" onClick={() => handleJoin(community.name)}>
                Join
              </button>
            </div>
          ))}

        {activeTab === "recent" && (
          <div className="empty-state">
            <p>No recent communities to show.</p>
          </div>
        )}
      </div>

      {dialogVisible && (
        <div className="dialog">
          <p>{dialogContent}</p>
          <button onClick={closeDialog}>Close</button>
        </div>
      )}
    </div>
  )
}

export default JoinCommunity
