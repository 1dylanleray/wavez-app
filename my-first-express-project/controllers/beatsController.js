const beatsService = require('../services/beatsService');

// Contrôleur pour récupérer la liste des beats
async function getAllBeats(req, res) {
    try {
        const beats = await beatsService.getAllBeats();
        res.status(200).json(beats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllBeats,
};
