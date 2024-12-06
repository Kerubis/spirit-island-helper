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
                ready: info.ready,
                me: (client === ws)
            });
        }
    }
    return players;
}

function getAdversaries() {
    const filePath = path.join(__dirname, './config/adversaries.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const adversaries = JSON.parse(data);
    return adversaries;
}

module.exports = {
    getPlayerArray,
    getAdversaries,
};