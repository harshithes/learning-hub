import React, { useState, useEffect } from 'react';
import './Contest.css';

const Contest = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/contests');
        const data = await response.json();
        setContests(data);
      } catch (error) {
        console.error("Failed to fetch contests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  const getSiteLogo = (host) => {
    if (host.includes('codeforces.com')) return 'https://codeforces.com/s/0/favicon.ico';
    if (host.includes('codechef.com')) return 'https://www.codechef.com/favicon.ico';
    if (host.includes('leetcode.com')) return 'https://leetcode.com/favicon.ico';
    return '';
  };

  if (loading) {
    return <div className="container"><h1>Loading Contests...</h1></div>;
  }

  return (
    <div className="container contest-container">
      <h1>Upcoming Contests</h1>
      <div className="contest-list">
        {contests.length > 0 ? (
          contests.map((contest) => (
            <a href={contest.href} target="_blank" rel="noopener noreferrer" key={contest.id || contest.event} className="contest-item-link">
              <div className="contest-item">
                <img src={getSiteLogo(contest.host)} alt={`${contest.host} logo`} className="site-logo" />
                <div className="contest-details">
                  {/* The field names are different: event, host, start, end */}
                  <h2>{contest.event}</h2>
                  <p><strong>Site:</strong> {contest.host}</p>
                  <p><strong>Starts:</strong> {new Date(contest.start).toLocaleString()}</p>
                  <p><strong>Ends:</strong> {new Date(contest.end).toLocaleString()}</p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p>No upcoming contests found from CodeForces, CodeChef, or LeetCode.</p>
        )}
      </div>
    </div>
  );
};

export default Contest;