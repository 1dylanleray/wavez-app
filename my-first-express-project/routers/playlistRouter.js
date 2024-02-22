const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.get('/playlists', playlistController.getAllPlaylists);
router.post('/playlists', playlistController.createPlaylist);
router.get('/playlists/:id', playlistController.getPlaylistById);
router.delete('/playlists/:id', playlistController.deletePlaylist);

module.exports = router;
