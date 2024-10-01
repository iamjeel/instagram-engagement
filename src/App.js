import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch Instagram data (this is where you'd use the API call)
  const fetchEngagementData = async () => {
    try {
      // Replace with your Instagram Graph API URL & Access Token
      // const apiURL = `https://your-backend-api/instagram-data?username=${username}`;
      const apiURL = `http://localhost:5000/instagram-data`;
      const response = await axios.get(apiURL);
      
      // Assuming the response contains post details
      setPosts(response.data.posts);
      setError(null); // Clear errors if successful
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data, please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Instagram Engagement Finder</h1>

      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Instagram username"
        />
        <button onClick={fetchEngagementData}>Get Engagement Data</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {posts.length > 0 && (
        <div>
          <h2>Engagement Details for @{username}</h2>
          <table>
            <thead>
              <tr>
                <th>Post</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Shares</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      View Post
                    </a>
                  </td>
                  <td>{post.likes}</td>
                  <td>{post.comments}</td>
                  <td>{post.shares}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
