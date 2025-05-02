import axios from 'axios';

const API_BASE_URL = 'https://gamedeliverypaas-api-g7eafbc2a7g5azdm.germanywestcentral-01.azurewebsites.net/api';

export const fetchGames = async () => {
  const response = await axios.get(`${API_BASE_URL}/Games`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/Users`);
  return response.data;
};

export const addComment = async (gameId, commentData) => {
    const response = await axios.post(`${API_BASE_URL}/Games/${gameId}/comments`, commentData);
    return response.data;
  };

export const updatePlayTime = async (gameId, username, playTime) => {
    const response = await axios.patch(`${API_BASE_URL}/Games/${gameId}/playtime`, {
      username,
      playTime
    });
    return response.data;
  };

  export const enableFeedback = async (gameId) => {
    const response = await axios.patch(`${API_BASE_URL}/Games/${gameId}/feedback/enable`);
    return response.data;
  };

  export const disableFeedback = async (gameId) => {
    const response = await axios.patch(`${API_BASE_URL}/Games/${gameId}/feedback/disable`);
    return response.data;
  };

  export const addGameAPI = async (gameData) => {
    const response = await axios.post(`${API_BASE_URL}/Games`, gameData);
    return response.data;
  };

  export const deleteGame = async (gameId) => {
    const response = await axios.delete(`${API_BASE_URL}/Games/${gameId}`);
    return response.status === 204;
  };

  export const addUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/Users`, userData);
    return response.data;
  };


  export const deleteUser = async (username) => {
    const response = await axios.delete(`${API_BASE_URL}/Users/${username}`);
    return response.status === 204;
  };
  