const { getPlayerArray } = require('./helper');
const { getAdversaries } = require('./helper');
const { clientData } = require('./globalState');

/**
 * Handle incoming WebSocket messages.
 * @param {WebSocket.Server} wss - The WebSocket server instance.
 * @param {WebSocket} ws - The client WebSocket instance.
 * @param {string} message - The raw message received.
 * @param {Function} broadcast - Function to broadcast messages to other clients.
 * @param {Function} sendToClient - Function to send a message to a specific client.
 */
function handleMessage(wss, ws, message, broadcast, sendToClient) {
    try {
        const parsedMessage = JSON.parse(message);
        switch (parsedMessage.type) {
            case 'joinGame':
                handleJoinGame(wss, ws, parsedMessage, broadcast, sendToClient);
                break;
            case 'getPlayers':
                handleGetPlayers(wss, ws, parsedMessage, broadcast, sendToClient);
            case 'ready':
                handleReady(wss, ws, parsedMessage, broadcast, sendToClient);
                break;
            default:
                sendToClient(ws, JSON.stringify({
                    type: 'error',
                    message: '400 Bad Request',
                }));
        }
    } catch (error) {
        console.log('Message Handler catching error:', error);
        sendToClient(ws, JSON.stringify({
            type: 'error',
            message: '400 Bad Request',
        }));
    }
}
function handleGetPlayers(wss, ws, parsedMessage, broadcast, sendToClient) {
    const players = getPlayerArray(ws);
    sendToClient(ws, JSON.stringify({
        type: 'players',
        players,
    }));
}
function handleJoinGame(wss, ws, parsedMessage, broadcast, sendToClient) {
    console.log('Handling join game');
    const clientInfo = clientData.get(ws);

    clientInfo.username = parsedMessage.username;
    clientInfo.playerColor = parsedMessage.playerColor;
    console.log('Player joined:', clientInfo.username);

    const players = getPlayerArray(ws);
    broadcast(
        wss,
        ws,
        JSON.stringify({
            type: 'players',
            players
        })
    );
    broadcast(
        wss,
        ws,
        JSON.stringify({
            type: 'gameSetup',
            adversaries: getAdversaries()
        })
    );
}
function handleReady(wss, ws, parsedMessage, broadcast, sendToClient) {
    const clientInfo = clientData.get(ws);

    clientInfo.ready = parsedMessage.ready;

    const players = getPlayerArray(ws);
    broadcast(
        wss,
        ws,
        JSON.stringify({
            type: 'players',
            players
        })
    );
}

module.exports = {
    handleMessage,
};
