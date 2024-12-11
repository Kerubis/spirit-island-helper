const fs = require('fs');
const path = require('path');
const { clientData } = require('./globalState');

function getPlayerArray(ws) {
    const players = [];
    for (const [client, info] of clientData.entries()) {
        if (info.username) {
            players.push({
                username: info.username,
                playerColor: info.playerColor,
                ready: info.ready
            });
        }
    }
    return players;
}

function getAdversaries() {
    var adversaries = [];
    //get all files in the adversaries directory
    const directoryPath = path.join(__dirname, 'config/adversaries');
    const files = fs.readdirSync(directoryPath);
    //for each file, read the contents and add to the adversaries array
    files.forEach(file => {
        const data = fs.readFileSync(path.join(directoryPath, file), 'utf8');
        adversaries.push(JSON.parse(data));
    });
    return adversaries;
}

module.exports = {
    getPlayerArray,
    getAdversaries,
};