const fs = require('fs');
const path = require('path');

const beatsFilePath = path.join(__dirname, '..', 'beats.json');

// Service pour récupérer la liste des beats depuis le fichier JSON
function getAllBeats() {
    return new Promise((resolve, reject) => {
        fs.readFile(beatsFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const beats = JSON.parse(data);
                    resolve(beats);
                } catch (error) {
                    reject(error);
                }
            }
        });
    });
}

module.exports = {
    getAllBeats,
};
