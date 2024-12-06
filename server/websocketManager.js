const WebSocket = require('ws');
const { getPlayerArray } = require('./helper');
const { handleMessage } = require('./messageHandler');
const { clientData } = require('./globalState');

/**
 * Broadcast a message to all clients except the excluded client.
 * @param {WebSocket.Server} wss - The WebSocket server.
 * @param {string} message - The message to broadcast.
 * @param {WebSocket} [excludeSender] - The client to exclude from the broadcast.
 */
function broadcast(wss, ws, message, excludeSender = false) {
    wss.clients.forEach((client) => {
        const websocketOpen = client.readyState === WebSocket.OPEN;
        const isSender = client === ws;
        const skipSender = excludeSender && isSender;
        if (websocketOpen && !skipSender) {
            sendToClient(client, message, isSender);
        }
    });
}

function sendToClient(ws, message, isSender = false) {
    const clientInfo = clientData.get(ws);

    if (!clientInfo.username) {
        let parsed;
        try {
            parsed = JSON.parse(message); // Attempt to parse the message as JSON
        } catch (error) {
            console.log('Invalid JSON received:', message);
            ws.send(JSON.stringify({
                type: 'error',
                message: '400 Bad Request',
            }));
            return;
        }
        ws.send(JSON.stringify({
            type: 'requestLogin',
            players: getPlayerArray(ws)
        }));
        return;
    }
    // If the client has a username, send the message as-is
    const messageToSend = JSON.stringify({
        
    });
    ws.send(message);
}

/**
 * Handle WebSocket connection.
 * @param {WebSocket.Server} wss - The WebSocket server.
 * @param {WebSocket} ws - The connected client.
 */
function handleConnection(wss, ws) {
    console.log('WebSocket client connected');

    // Initialize data for the client
    clientData.set(ws, {});
    broadcast(wss, ws, JSON.stringify(
        {
            type: 'players',
            players: getPlayerArray(ws)
        }
    ), true);

    // Handle incoming messages
    ws.on('message', (message) => {
        // console.log('Websocket Manager Received message:', message);
        handleMessage(wss, ws, message, broadcast, sendToClient);
    });

    // Handle disconnection
    ws.on('close', () => {
        const clientInfo = clientData.get(ws);
        const username = clientInfo?.username || 'Anonymous';

        console.log(`${username} disconnected`);

        // Broadcast disconnection message
        broadcast(wss, ws, JSON.stringify(
            {
                type: 'players',
                players: getPlayerArray(ws)
            }
        ), true);

        // Remove client's data
        clientData.delete(ws);
    });
}

module.exports = {
    handleConnection,
};
