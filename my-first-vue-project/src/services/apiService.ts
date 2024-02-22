import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const baseURL: string = 'http://localhost:3000/api'; // Remplace avec l'URL de ton serveur backend

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface Beat {
  id: number;
  title: string;
  // Ajoute les autres propriétés pour un beat
}

interface Playlist {
  id: number;
  name: string;
  // Ajoute les autres propriétés pour une playlist
}

export default {
  getAllBeats(): Promise<AxiosResponse<Beat[]>> {
    return apiClient.get<Beat[]>('/beats');
  },
  createBeat(newBeat: Beat): Promise<AxiosResponse<Beat>> {
    return apiClient.post<Beat>('/beats', newBeat);
  },
  getBeatById(id: number): Promise<AxiosResponse<Beat>> {
    return apiClient.get<Beat>(`/beats/${id}`);
  },
  updateBeat(id: number, updatedBeat: Beat): Promise<AxiosResponse<{ message: string }>> {
    return apiClient.put<{ message: string }>(`/beats/${id}`, updatedBeat);
  },
  deleteBeat(id: number): Promise<AxiosResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/beats/${id}`);
  },
  getAllPlaylists(): Promise<AxiosResponse<Playlist[]>> {
    return apiClient.get<Playlist[]>('/playlists');
  },
  createPlaylist(newPlaylist: Playlist): Promise<AxiosResponse<Playlist>> {
    return apiClient.post<Playlist>('/playlists', newPlaylist);
  },
  getPlaylistById(id: number): Promise<AxiosResponse<Playlist>> {
    return apiClient.get<Playlist>(`/playlists/${id}`);
  },
  deletePlaylist(id: number): Promise<AxiosResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/playlists/${id}`);
  },
};
