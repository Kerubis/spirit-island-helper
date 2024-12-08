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
    switch (parsed.content.type) {
        case 'players':
            renderPlayers(parsed, (ready) => {
                ws.send(JSON.stringify({ type: "ready", ready: ready }));
            });
            break;
        case 'gameSetup':
            renderGameSetup(parsed.content.adversaries, parsed.content.scenarios);
            break;
        case 'gameData':
            console.log('Game data:', parsed.content.game);
            break;
        case 'error':
            console.log('Error:', parsed.content.message);
            break;
        default:
            console.log('Unknown message type:', parsed);
    }
};

ws.onclose = () => {
    // appendMessage('Disconnected from server');
};

