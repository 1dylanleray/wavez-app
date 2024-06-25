// Exemple de données en mémoire pour les playlists (à titre d'exemple)
let playlists = [
    { id: 1, name: 'Playlist 1', beats: [1, 3, 5] },
    { id: 2, name: 'Playlist 2', beats: [2, 4] },
    // Ajouter d'autres playlists ici...
  ];
  
  exports.getAllPlaylists = () => playlists;
  
  exports.createPlaylist = (newPlaylist) => {
    const playlist = { id: playlists.length + 1, ...newPlaylist };
    playlists.push(playlist);
    return playlist;
  };
  
  exports.getPlaylistById = (id) => playlists.find((playlist) => playlist.id === parseInt(id));
  
  exports.deletePlaylist = (id) => {
    playlists = playlists.filter((playlist) => playlist.id !== parseInt(id));
    return { message: 'Playlist deleted successfully' };
  };
  