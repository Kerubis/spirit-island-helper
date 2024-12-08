function createTextBox(text) {
    const textBox = document.createElement("div");
    textBox.style.display = "flex";
    textBox.style.justifyContent = "center";
    textBox.style.alignItems = "center";
    textBox.style.width = "100%";
    textBox.style.height = "100%";
    textBox.style.fontSize = "16px";
    textBox.style.fontWeight = "bold";
    textBox.style.overflow = "hidden";
    textBox.textContent = text;
    return textBox;
}

function generateLoginFormUI(players) {
    const login = document.createElement("div");
    login.id = "login";
    login.style.display = "flex";
    login.style.position = "absolute";
    login.style.top = "50%";
    login.style.left = "50%";
    login.style.transform = "translate(-50%, -50%)";
    login.style.flexDirection = "column";
    login.style.alignItems = "center";
    login.style.justifyContent = "center";

    const usernameInput = document.createElement("input");
    usernameInput.style.display = "flex";
    usernameInput.style.marginBottom = "5px";
    usernameInput.placeholder = "Username";

    const colorOptions = ["red", "blue", "green", "pink", "orange", "yellow"];
    const colorPicker = document.createElement("div");
    colorPicker.style.margin = "0";
    colorPicker.style.padding = "0";

    colorOptions.forEach(color => {
        const colorBox = document.createElement("div");
        colorBox.style.position = "relative";
        colorBox.style.backgroundColor = color;
        colorBox.style.width = "30px";
        colorBox.style.height = "30px";
        colorBox.style.display = "inline-block";
        colorBox.style.borderRadius = "50%";
        colorBox.style.margin = "0 4px";
        colorBox.style.overflow = "hidden";
        colorBox.dataset.color = color;
        colorBox.style.boxShadow = "0 0 4px 1px rgba(0, 0, 0, 0.5)";

        if (players.some(player => player.playerColor === color)) {
            //get player username
            const player = players.find(player => player.playerColor === color);
            const textBox = createTextBox(player.username.substring(0, 2));
            colorBox.appendChild(textBox);

            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            overlay.style.zIndex = "1";
            overlay.style.borderRadius = "50%";
            colorBox.appendChild(overlay);
        } else {
            colorBox.classList.add("color-box");
            colorBox.style.cursor = "pointer";
            colorBox.style.boxShadow = "0 0 6px 2px rgb(0 255 69)";
        }

        colorPicker.appendChild(colorBox);
    });

    const joinGameButton = document.createElement("button");
    joinGameButton.textContent = "Join Game";
    joinGameButton.style.display = "flex";
    joinGameButton.style.marginTop = "5px";

    login.appendChild(usernameInput);
    login.appendChild(colorPicker);
    login.appendChild(joinGameButton);

    return { login, usernameInput, colorPicker, joinGameButton };
}

function attachLoginFormLogic(players, uiElements, onJoinGame) {
    const { login, usernameInput, colorPicker, joinGameButton } = uiElements;

    usernameInput.addEventListener("input", (e) => {
        document.querySelectorAll(".color-box").forEach(box => {
            box.innerHTML = "";
            const textBox = createTextBox(e.target.value.substring(0, 2));
            box.appendChild(textBox);
        });
    });

    colorPicker.querySelectorAll(".color-box").forEach(colorBox => {
        colorBox.addEventListener("click", () => {
            document.querySelectorAll(".color-box").forEach(box => {
                box.classList.remove("selected");
                box.style.outline = "none";
            });
            colorBox.classList.add("selected");
            colorBox.style.outline = "3px solid lightblue";
        });
    });

    joinGameButton.addEventListener("click", () => {
        const username = usernameInput.value;
        const playerColor = document.querySelector(".selected")?.dataset.color;

        if (!username) {
            usernameInput.style.outline = "1px solid red";
            return;
        }

        if (!playerColor) {
            return;
        }

        console.log(`Joining game with username: ${username} and color: ${playerColor}`);
        onJoinGame(username, playerColor);
    });

    return login;
}

function renderLogin(players, onJoinGame) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    const uiElements = generateLoginFormUI(players);
    const loginForm = attachLoginFormLogic(players, uiElements, onJoinGame);

    contentDiv.appendChild(loginForm);
}