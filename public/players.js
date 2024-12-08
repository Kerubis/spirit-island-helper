function renderPlayers(message, onReady) {
    const players = message.content.players;

    const playerContainer = getPlayerContainer();
    playerContainer.innerHTML = "";
    //move player with myColor to the front
    players.sort((a, b) => a.playerColor === message.myColor ? -1 : 1);
    players.forEach(player => {
        const isMe = message.myColor === player.playerColor;

        const playerWrapper = createPlayerWrapper(isMe);
        const playerBox = createPlayerBox(isMe, player);
        const textBox = createPlayerTextBox(player);

        playerContainer.appendChild(playerWrapper);
        playerWrapper.appendChild(playerBox);
        playerBox.appendChild(textBox);

        if (!isMe) {
            const readyToken = createReadyToken(player.ready);
            playerWrapper.appendChild(readyToken);
        }
    });

    const isReady = players.find(player => player.playerColor === message.myColor).ready;
    playerContainer.style.backgroundColor = isReady ? "#67f767" : "#e75d5d";
    playerContainer.onclick = () => {
        onReady(!isReady);
    }
}
function getPlayerContainer() {
    var playerContainer = document.getElementById("players");
    if (!playerContainer) {
        playerContainer = document.createElement("div");
        playerContainer.id = "players";
        playerContainer.style.position = "absolute";
        playerContainer.style.bottom = "0";
        playerContainer.style.right = "0";
        playerContainer.style.width = "100%";
        playerContainer.style.height = "50px";
        playerContainer.style.display = "flex";
        playerContainer.style.flexDirection = "row";
        playerContainer.style.alignItems = "center";
        playerContainer.style.justifyContent = "center";
        playerContainer.style.borderTop = "1px solid black";
        playerContainer.style.cursor = "pointer";
        document.getElementById("content").appendChild(playerContainer);
    }
    return playerContainer;
}

function createPlayerWrapper(isMe) {
    const playerWrapper = document.createElement("div");
    playerWrapper.style.position = "relative";
    playerWrapper.style.width = "40px";
    playerWrapper.style.aspectRatio = "1/1";
    playerWrapper.style.display = "inline-block";
    if (isMe) {
        playerWrapper.style.marginRight = "20px";
    }
    return playerWrapper;
}
function createPlayerBox(isMe, player) {
    const playerBox = document.createElement("div");
    playerBox.style.position = "absolute";
    playerBox.style.top = "50%";
    playerBox.style.left = "50%";
    playerBox.style.transform = "translate(-50%, -50%)";
    playerBox.style.backgroundColor = player.playerColor;
    playerBox.style.width = "30px";
    playerBox.style.height = "30px";
    playerBox.style.borderRadius = "50%";
    playerBox.style.margin = "0 2px";
    playerBox.style.overflow = "hidden";
    playerBox.style.boxShadow = "0 0 4px 1px rgba(0, 0, 0, 0.5)";
    if (isMe) {
        // playerBox.style.outline = "2px solid lightgreen";
    }
    return playerBox;
}
function createPlayerTextBox(player) {
    const playerTextbox = document.createElement("div");
    playerTextbox.style.display = "flex";
    playerTextbox.style.justifyContent = "center";
    playerTextbox.style.alignItems = "center";
    playerTextbox.style.width = "100%";
    playerTextbox.style.height = "100%";
    playerTextbox.style.fontSize = "16px";
    playerTextbox.style.fontWeight = "bold";
    playerTextbox.style.overflow = "hidden";
    playerTextbox.style.alignContent = "center";
    playerTextbox.textContent = player.username.substring(0, 2);
    return playerTextbox;
}

function createReadyToken(ready) {
    const readyToken = document.createElement("div");
    readyToken.style.position = "absolute";
    readyToken.style.top = "0";
    readyToken.style.right = "-2px";
    readyToken.style.width = "10px";
    readyToken.style.height = "10px";
    readyToken.style.backgroundColor = ready ? "#67f767" : "#e75d5d";
    readyToken.style.border = "1px solid black";
    readyToken.style.borderRadius = "50%";
    readyToken.style.zIndex = "1";
    return readyToken;
}