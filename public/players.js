function renderPlayers(players, onReady) {
    const playerContainer = getPlayerContainer();
    playerContainer.innerHTML = "";
    players.forEach(player => {
        const playerWrapper = document.createElement("div");
        playerWrapper.style.position = "relative";
        playerWrapper.style.width = "40px";
        playerWrapper.style.aspectRatio = "1/1";
        playerWrapper.style.display = "inline-block";

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
        if (player.me) {
            playerBox.style.outline = "2px solid lightgreen";
        }

        const textBox = document.createElement("div");
        textBox.style.display = "flex";
        textBox.style.justifyContent = "center";
        textBox.style.alignItems = "center";
        textBox.style.width = "100%";
        textBox.style.height = "100%";
        textBox.style.fontSize = "16px";
        textBox.style.fontWeight = "bold";
        textBox.style.overflow = "hidden";
        textBox.style.alignContent = "center";
        textBox.textContent = player.username.substring(0, 2);

        const readyToken = document.createElement("div");
        readyToken.style.position = "absolute";
        readyToken.style.top = "0";
        readyToken.style.right = "-2px";
        readyToken.style.width = "10px";
        readyToken.style.height = "10px";
        readyToken.style.backgroundColor = player.ready ? "green" : "red";
        readyToken.style.border = "1px solid black";
        readyToken.style.borderRadius = "50%";
        readyToken.style.zIndex = "1";

        playerBox.appendChild(textBox);
        playerWrapper.appendChild(playerBox);
        playerWrapper.appendChild(readyToken);

        playerContainer.appendChild(playerWrapper);
    });

    readyButton = document.createElement("button");
    readyButton.style.position = "absolute";
    readyButton.style.bottom = "0";
    readyButton.style.left = "0";
    readyButton.style.width = "100px";
    readyButton.style.height = "20px";
    readyButton.textContent = "Ready";
    readyButton.onclick = () => {
        onReady(true);
    }
    playerContainer.appendChild(readyButton);
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
        document.getElementById("content").appendChild(playerContainer);
    }
    return playerContainer;
}