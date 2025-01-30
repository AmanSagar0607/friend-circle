import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function FriendList() {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
    fetchRecommendations();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get('/api/users/friends', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
      toast.error('Failed to load friends');
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get('/api/users/friend-requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
      toast.error('Failed to load friend requests');
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('/api/users/recommendations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to load recommendations');
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map(request => (
          <li key={request._id}>{request.username}</li>
        ))}
      </ul>
      <h2>Friends</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend._id}>{friend.username}</li>
        ))}
      </ul>
      <h2>Recommended Friends</h2>
      <ul>
        {recommendations.map(recommendation => (
          <li key={recommendation._id}>{recommendation.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;