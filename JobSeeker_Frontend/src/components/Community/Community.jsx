import { useState } from "react"
import communityData from "../../data/Community.json"
import "./Community.css"

// this component has the role of displaying a list of communities that the user can join.
// The component uses the communityData from the Community.json file to populate the list of communities.

const JoinCommunity = () => {
  const [activeTab, setActiveTab] = useState("popular")
  const { communities, suggested } = communityData

  const handleJoin = (communityId) => {
    console.log(`Joined community ${communityId}`)
    // rn it just logs the community id to the console
  }

  return (
    <div className="join-community-container">
      <h1>Join a Community</h1>

      <div className="community-tabs">
        <button className={`tab ${activeTab === "popular" ? "active" : ""}`} onClick={() => setActiveTab("popular")}>
          Popular
        </button>
        <button className={`tab ${activeTab === "recent" ? "active" : ""}`} onClick={() => setActiveTab("recent")}>
          Recent
        </button>
        <button
          className={`tab ${activeTab === "suggested" ? "active" : ""}`}
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
              <button className="join-community-btn" onClick={() => handleJoin(community.id)}>
                Join
              </button>
            </div>
          ))}

        {activeTab === "suggested" &&
          suggested.map((community) => (
            <div key={community.id} className="community-card">
              <h3>{community.name}</h3>
              <p>{community.members} members</p>
              <button className="join-community-btn" onClick={() => handleJoin(community.id)}>
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
    </div>
  )
}

export default JoinCommunity

