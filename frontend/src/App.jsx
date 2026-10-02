import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [roleFilter, setRoleFilter] = useState("All");
const [timezoneFilter, setTimezoneFilter] = useState("All");
const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date());

  // Refresh "time ago" every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Convert timestamp into "time ago" text
  const getTimeAgo = (timestamp) => {
    const updatedTime = new Date(timestamp);
    const now = new Date();

    const differenceInSeconds = Math.floor(
      (now - updatedTime) / 1000
    );

    if (differenceInSeconds < 60) {
      return "Just now";
    }

    const minutes = Math.floor(
      differenceInSeconds / 60
    );

    if (minutes < 60) {
      return `${minutes} minute${
        minutes !== 1 ? "s" : ""
      } ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${
        hours !== 1 ? "s" : ""
      } ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days} day${
      days !== 1 ? "s" : ""
    } ago`;
  };

  // Fetch team members from backend
  const fetchMembers = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
  setRefreshing(true);
}
      const response = await fetch(
        "http://localhost:5000/api/team-members"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch team members"
        );
      }

      const result = await response.json();

      setMembers(result.data);
setLoading(false);
setError("");
setLastSynced(new Date());
    } catch (err) {
      console.error(err);
      setError("Unable to load team members.");
      setLoading(false);
    } finally {
  setRefreshing(false);
}
  };

  // Initial fetch
  useEffect(() => {
    fetchMembers();
  }, []);

  // Auto-refresh team data every 10 seconds
  useEffect(() => {
    const refreshTimer = setInterval(() => {
      fetchMembers();
    }, 10000);

    return () => clearInterval(refreshTimer);
  }, []);

  // Update member status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/team-members/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Failed to update status"
        );
      }

      // Update frontend immediately
      // using the data returned by backend
      setMembers((currentMembers) =>
        currentMembers.map((member) =>
          member.id === id
            ? {
                ...member,
                status: result.data.status,
                updated_at: result.data.updated_at,
              }
            : member
        )
      );
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      alert("Unable to update status.");
    }
  };

  // Search and filter
  const filteredMembers = members.filter(
    (member) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        member.name
          .toLowerCase()
          .includes(searchText) ||
        member.role
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
  statusFilter === "All" ||
  member.status === statusFilter;

const matchesRole =
  roleFilter === "All" ||
  member.role === roleFilter;

const matchesTimezone =
  timezoneFilter === "All" ||
  member.timezone === timezoneFilter;

return (
  matchesSearch &&
  matchesStatus &&
  matchesRole &&
  matchesTimezone
);
    }
  );

  // Status counts
  const availableCount = members.filter(
    (member) =>
      member.status === "Available"
  ).length;

  const busyCount = members.filter(
    (member) =>
      member.status === "Busy"
  ).length;

  const awayCount = members.filter(
    (member) =>
      member.status === "Away"
  ).length;

  return (
    <div className="app">

      {/* Header */}
      <header className="header">

        <div>
          <h1>
            Team Availability Tracker
          </h1>

          <p>
            Monitor your team's
            availability in real time.
          </p>
        </div>

        <div className="live-badge">
          <span></span>
          Live
        </div>

      </header>

      {/* Statistics */}
      <section className="stats">

        {/* Total Members */}
        <div className="stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>
            <h3>
              {members.length}
            </h3>

            <p>
              Total Members
            </p>
          </div>

        </div>

        {/* Available */}
        <div className="stat-card available-card">

          <div className="stat-icon">
            🟢
          </div>

          <div>
            <h3>
              {availableCount}
            </h3>

            <p>
              Available
            </p>
          </div>

        </div>

        {/* Busy */}
        <div className="stat-card busy-card">

          <div className="stat-icon">
            🔴
          </div>

          <div>
            <h3>
              {busyCount}
            </h3>

            <p>
              Busy
            </p>
          </div>

        </div>

        {/* Away */}
        <div className="stat-card away-card">

          <div className="stat-icon">
            🟡
          </div>

          <div>
            <h3>
              {awayCount}
            </h3>

            <p>
              Away
            </p>
          </div>

        </div>

      </section>

      {/* Search and Filter */}
      <section className="controls">

  <input
    type="text"
    placeholder="Search by name or role..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(e.target.value)
    }
  >
    <option value="All">
      All Status
    </option>

    <option value="Available">
      Available
    </option>

    <option value="Busy">
      Busy
    </option>

    <option value="Away">
      Away
    </option>
  </select>
  <select
  value={roleFilter}
  onChange={(e) =>
    setRoleFilter(e.target.value)
  }
>
  <option value="All">
    All Roles
  </option>

  <option value="Design">
    Design
  </option>

  <option value="Product">
    Product
  </option>

  <option value="Engineering">
    Engineering
  </option>

  <option value="QA">
    QA
  </option>
</select>

<select
  value={timezoneFilter}
  onChange={(e) =>
    setTimezoneFilter(e.target.value)
  }
>
  <option value="All">
    All Timezones
  </option>

  <option value="Europe/London">
    Europe/London
  </option>

  <option value="Asia/Kolkata">
    Asia/Kolkata
  </option>

  <option value="America/New_York">
    America/New_York
  </option>
</select>

  <button
    className="refresh-button"
    onClick={() => fetchMembers(true)}
    disabled={refreshing}
  >
    {refreshing ? "⟳ Refreshing..." : "🔄 Refresh"}
  </button>

</section>
<div className="sync-info">
  Last synced:{" "}
  {getTimeAgo(lastSynced)}
</div>

      {/* Loading */}
      {loading && (
        <div className="message">
          Loading team members...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="message error">
          {error}
        </div>
      )}

      {/* Team Members */}
      {!loading && !error && (
        <section className="team-grid">

          {filteredMembers.length > 0 ? (

            filteredMembers.map(
              (member) => (

                <div
                  className="member-card"
                  key={member.id}
                >

                  {/* Member Top */}
                  <div className="member-top">

                    <div className="avatar">
                      {member.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <span
                      className={`status ${member.status.toLowerCase()}`}
                    >
                      {member.status}
                    </span>

                  </div>

                  {/* Name */}
                  <h2>
                    {member.name}
                  </h2>

                  {/* Role */}
                  <p className="role">
                    {member.role}
                  </p>

                  {/* Status Controls */}
                  <div className="status-controls">

                    {/* Available */}
                    <button
                      className={
                        member.status ===
                        "Available"
                          ? "active available-button"
                          : "available-button"
                      }
                      onClick={() =>
                        updateStatus(
                          member.id,
                          "Available"
                        )
                      }
                    >
                      🟢 Available
                    </button>

                    {/* Busy */}
                    <button
                      className={
                        member.status ===
                        "Busy"
                          ? "active busy-button"
                          : "busy-button"
                      }
                      onClick={() =>
                        updateStatus(
                          member.id,
                          "Busy"
                        )
                      }
                    >
                      🔴 Busy
                    </button>

                    {/* Away */}
                    <button
                      className={
                        member.status ===
                        "Away"
                          ? "active away-button"
                          : "away-button"
                      }
                      onClick={() =>
                        updateStatus(
                          member.id,
                          "Away"
                        )
                      }
                    >
                      🟡 Away
                    </button>

                  </div>

                  {/* Member Information */}
                  <div className="member-info">

                    {/* Timezone */}
                    <div>
                      <span>🌐</span>

                      <span>
                        {member.timezone}
                      </span>
                    </div>

                    {/* Role */}
                    <div>
                      <span>💼</span>

                      <span>
                        {member.role}
                      </span>
                    </div>

                    {/* Last Updated */}
                    <div>
                      <span>🕐</span>

                      <span>
                        Last updated:{" "}
                        {getTimeAgo(
                          member.updated_at
                        )}
                      </span>
                    </div>

                  </div>

                </div>

              )
            )

          ) : (

            <div className="message">
              No team members found.
            </div>

          )}

        </section>
      )}

    </div>
  );
}

export default App;