const WebSocket = require('ws');
const { getPlayerArray } = require('./helper');
const { handleMessage } = require('./messageHandler');

// Map to store temporary data for each client
const clientData = new Map();
const gameData = {};

/**
 * Broadcast a message to all clients except the excluded client.
 * @param {WebSocket.Server} wss - The WebSocket server.
 * @param {string} message - The message to broadcast.
 * @param {WebSocket} [excludeClient] - The client to exclude from the broadcast.
 */
function broadcast(wss, clientData, message, excludeClient = null) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== excludeClient) {
            const ws = client; // Assign the WebSocket instance to ws
            sendToClient(ws, clientData, message);
        }
    });
}

function sendToClient(ws, clientData, message) {
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

        // Check the message type after ensuring it is valid JSON
        if (parsed.type === 'joinGame') {
            handleJoinGame(wss, ws, clientData, message, broadcast);
        } else {
            ws.send(JSON.stringify({
                type: 'requestLogin',
                players: getPlayerArray(ws, clientData)
            }));
        }
        return;
    }

    // If the client has a username, send the message as-is
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
    broadcast(wss, clientData, JSON.stringify(
        {
            type: 'players',
            players: getPlayerArray(ws, clientData)
        }
    ), ws);

    // Handle incoming messages
    ws.on('message', (message) => {
        // console.log('Websocket Manager Received message:', message);
        handleMessage(wss, ws, clientData, message, broadcast, sendToClient);
    });

    // Handle disconnection
    ws.on('close', () => {
        const clientInfo = clientData.get(ws);
        const username = clientInfo?.username || 'Anonymous';

        console.log(`${username} disconnected`);

        // Broadcast disconnection message
        broadcast(wss, clientData, JSON.stringify(
            {
                type: 'players',
                players: getPlayerArray(ws, clientData)
            }
        ), ws);

        // Remove client's data
        clientData.delete(ws);
    });
}

module.exports = {
    handleConnection,
};
