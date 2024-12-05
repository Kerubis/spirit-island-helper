const messagesDiv = document.getElementById('content');

// Connect to WebSocket server
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    ws.send(JSON.stringify({}));
};

ws.onmessage = (event) => {
    const parsed = JSON.parse(event.data);
    if (parsed.type === 'requestLogin') {
        renderLogin(parsed.players, (username, playerColor) => {
            ws.send(JSON.stringify({ type: "joinGame", username, playerColor }));
        });
        return;
    } else {
        const loginDiv = document.getElementById('login');
        if (loginDiv) {
            loginDiv.remove();
        }
    }
    switch (parsed.type) {
        case 'players':
            renderPlayers(parsed.players, (ready) => {
                ws.send(JSON.stringify({ type: "ready", ready: ready }));
            });
            break;
        case 'gameSetup':
            renderGameSetup(parsed.adversaries, parsed.scenarios);
            break;
        case 'gameData':
            console.log('Game data:', parsed.data);
            break;
        case 'error':
            console.log('Error:', parsed.message);
            break;
        default:
            console.log('Unknown message type:', parsed.type);
    }
};

ws.onclose = () => {
    appendMessage('Disconnected from server');
};

function appendMessage(message) {
    const div = document.createElement('div');
    div.textContent = message;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
}
