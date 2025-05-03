import axios from 'axios';

const API_BASE_URL = 'https://gamedeliverypaas-api-g7eafbc2a7g5azdm.germanywestcentral-01.azurewebsites.net/api';

// Oyunları getir
export const fetchGames = async () => {
  const response = await axios.get(`${API_BASE_URL}/Games`);
  return response.data;
};

// Kullanıcıları getir
export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/Users`);
  return response.data;
};

// Oyunlara yorum ekle
export const addComment = async (gameId, { userId, content }) => {
  const response = await axios.post(
    `${API_BASE_URL}/Games/${gameId}/comments?userId=${userId}`,
    content, // sadece düz string gönderiyoruz
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};


// Oyun oynama süresi güncelle
export const updatePlayTime = async (userId, gameId, minutes) => {
  console.log(`Calling: /Users/${userId}/play/${gameId}?minutes=${minutes}`);
  const hours = Math.floor(minutes / 60);
  const response = await axios.post(`${API_BASE_URL}/Users/${userId}/play/${gameId}?minutes=${minutes}&hours=${hours}`);
  return response.data;
};



// Yeni oyun ekle
export const addGameAPI = async (gameData) => {
  const response = await axios.post(`${API_BASE_URL}/Games`, gameData);
  return response.data;
};

// Oyun sil
export const deleteGame = async (gameId) => {
  const response = await axios.delete(`${API_BASE_URL}/Games/${gameId}`);
  return response.status === 204;
};

// Yeni kullanıcı ekle
export const addUser = async (userData) => {
  const payload = {
    username: userData.username,
    email: userData.email,
    avatarUrl: userData.avatarUrl || "",
    canComment: userData.canComment,
    canRate: userData.canRate,
    playedGameIds: [],
    playedGames: [],
    ratedGames: []
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/Users`, payload);
    return response.data;
  } catch (err) {
    if (err.response?.status === 409) {
      throw new Error("A user with the same username or email already exists.");
    } else {
      throw new Error("An unexpected error occurred while adding the user.");
    }
  }
};


// Kullanıcı sil
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/Users/${id}`);
  return response.status === 204;
};

// Oyun güncelle (PUT)
export const updateGame = async (gameId, updatedGameData) => {
  const response = await axios.put(`${API_BASE_URL}/Games/${gameId}`, updatedGameData);
  return response.data;
};

// Yorum ve puanlama devre dışı bırak
export const disableFeedback = async (gameId) => {
  const response = await axios.patch(`${API_BASE_URL}/Games/${gameId}/disable-feedback`);
  return response.data;
};

// Yorum ve puanlama etkinleştir
export const enableFeedback = async (game) => {
  const updatedGame = { ...game, isFeedbackEnabled: true };
  const response = await axios.put(`${API_BASE_URL}/Games/${game.id}`, updatedGame);
  return response.data;
};

export const addRating = async (userId, gameId, rating) => {
  const response = await axios.post(
    `${API_BASE_URL}/Users/${userId}/rate/${gameId}?rating=${rating}`
  );
  return response.data;
};