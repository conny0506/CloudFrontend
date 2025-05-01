// gamesApi.js
import api from './Api';

// Tüm oyunları getir
export const getAllGames = async () => {
  try {
    const response = await api.get('/Games');
    console.log("deneme" , response)
    return response.data;
  } catch (error) {
    console.error("Oyunlar alınamadı:", error);
    return [];
  }
};

// Yeni oyun ekle
export const addGame = async (gameData) => {
  try {
    const response = await api.post('/Games', gameData);
    return response.data;
  } catch (error) {
    console.error("Oyun eklenemedi:", error);
    throw error;
  }
};

// Oyun sil
export const deleteGame = async (gameId) => {
  try {
    const response = await api.delete(`/Games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Oyun silinemedi:", error);
    throw error;
  }
};
