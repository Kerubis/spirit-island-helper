const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { handleConnection } = require('./server/websocketManager');

const app = express();
const port = 8080;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Create an HTTP server and pass it to WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => handleConnection(wss, ws));

// Start the server
server.listen(port, () => {
    console.log(`HTTP server running at http://localhost:${port}`);
    console.log(`WebSocket server running at ws://localhost:${port}`);
});
