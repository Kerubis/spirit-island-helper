function renderGameSetup(adversaries, scenrios) {
    const gameSetupContainer = document.createElement("div");
    gameSetupContainer.innerHTML = "";
    gameSetupContainer.id = "gameSetup";
    gameSetupContainer.style.position = "absolute";
    gameSetupContainer.style.top = "0";
    gameSetupContainer.style.left = "0";
    gameSetupContainer.style.right = "0";
    gameSetupContainer.style.bottom = "50px";

    const adversariesContainer = createadversariesContainer(adversaries);
    const scenriosContainer = createScenriosContainer();

    const content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(gameSetupContainer);
    gameSetupContainer.appendChild(adversariesContainer);
    gameSetupContainer.appendChild(scenriosContainer);
}

function createadversariesContainer(adversaries) {
    var adversariesContainer = document.getElementById("adversaries");
    if (!adversariesContainer) {
        adversariesContainer = document.createElement("div");
        adversariesContainer.style.position = "absolute";
        adversariesContainer.style.top = "10px";
        adversariesContainer.style.left = "10px";
        adversariesContainer.style.right = "10px";
        adversariesContainer.style.height = "30px";
        adversariesContainer.style.boxShadow = "0 0 5px 2px rgba(0, 0, 0, 0.5)";
        adversariesContainer.style.transition = "0.5s";
        adversariesContainer.style.boxSizing = "border-box";
    }

    const adversarySelector = createAdvasarySelector();
    const adversaryLabel = createAdversaryLabel("Select Adversary");
    const adversarySelectBox = createAdversarySelectBox();


    adversariesContainer.appendChild(adversarySelector);
    adversarySelector.appendChild(adversaryLabel);
    adversariesContainer.appendChild(adversarySelectBox);

    adversaries.forEach(adversary => {
        const adversaryBox = createAdvasaryBox(adversary);
        adversarySelectBox.appendChild(adversaryBox);

        adversary.levels.sort((a, b) => b.level - a.level);
        adversary.levels.forEach(level => {
            console.log(level);
            const adversariesLevelsBox = document.createElement("div");
            adversariesLevelsBox.style.display = "flex";
            adversariesLevelsBox.style.float = "right";
            adversariesLevelsBox.style.padding = "5px";

            const levelLabel = document.createElement("label");
            levelLabel.textContent = `Level: ${level.level} (${level.difficulty})`;
            levelLabel.onmouseover = () => {
                const tooltipPosition = levelLabel.getBoundingClientRect().bottom + 10;
                const tooltip = createLevelTooltip(level, tooltipPosition, true);
                adversariesLevelsBox.appendChild(tooltip);
            }
            levelLabel.onmouseout = () => {
                adversariesLevelsBox.removeChild(adversariesLevelsBox.lastChild);
            }
            adversariesLevelsBox.onclick = (event) => {
                adversaryLabel.textContent = `Adversary: ${adversary.name} - Level: ${level.level} (${level.difficulty})`;
                adversariesContainer.style.height = "30px";
                adversarySelectBox.style.display = "none";
                adversarySelectBox.style.transition = "0s";
            }

            adversariesLevelsBox.appendChild(levelLabel);
            adversaryBox.appendChild(adversariesLevelsBox);
        });
    });


    adversarySelector.onclick = () => {
        if (adversarySelectBox.style.display === "block") {
            adversariesContainer.style.height = "30px";
            adversarySelectBox.style.display = "none";
            adversarySelectBox.style.transition = "0s";
            return;
        }
        adversariesContainer.style.height = "calc(100% - 20px)";
        adversarySelectBox.style.display = "block";
        adversarySelectBox.style.transition = "0.5s";
    }

    return adversariesContainer;
}
function createAdvasarySelector() {
    const adversarySelector = document.createElement("div");
    adversarySelector.style.position = "absolute";
    adversarySelector.style.top = "0";
    adversarySelector.style.left = "0";
    adversarySelector.style.right = "0";
    adversarySelector.style.height = "30px";
    adversarySelector.style.display = "flex";
    adversarySelector.style.flexDirection = "row";
    adversarySelector.style.alignItems = "center";
    adversarySelector.style.justifyContent = "center";
    adversarySelector.style.cursor = "pointer";
    return adversarySelector;
}
function createAdversaryLabel(text) {
    const adversaryLabel = document.createElement("label");
    adversaryLabel.textContent = text;
    return adversaryLabel;
}
function createAdversarySelectBox() {
    const adversarySelectBox = document.createElement("div");
    adversarySelectBox.style.display = "none";
    adversarySelectBox.style.position = "absolute";
    adversarySelectBox.style.top = "30px";
    adversarySelectBox.style.left = "20px";
    adversarySelectBox.style.right = "20px";
    adversarySelectBox.style.bottom = "20px";
    return adversarySelectBox;
}

function createAdvasaryBox(advasary) {
    const adversaryBox = document.createElement("div");
    adversaryBox.style.position = "relative";
    adversaryBox.style.width = "100%";
    adversaryBox.style.height = "30px";
    adversaryBox.style.marginTop = "8px";
    adversaryBox.style.boxShadow = "0 0 5px 2px rgba(0, 0, 0, 0.5)";
    adversaryBox.style.backgroundColor = "#cb8351";
    adversaryBox.style.borderRadius = "5px";
    adversaryBox.style.overflow = "hidden";

    const advasaryName = document.createElement("div");
    advasaryName.textContent = advasary.name;
    advasaryName.style.display = "flex";
    advasaryName.style.float = "left";
    advasaryName.style.bottom = "0";
    advasaryName.style.left = "0";
    advasaryName.style.padding = "5px";

    adversaryBox.appendChild(advasaryName);

    return adversaryBox;
}
function createLevelTooltip(level, position, isTouch) {
    const tooltip = document.createElement("div");
    tooltip.style.position = "fixed";
    tooltip.style.top = `${position}px`;
    tooltip.style.left = `50%`;
    tooltip.style.transform = `translateX(-50%)`;
    tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    tooltip.style.color = "white";
    tooltip.style.padding = "5px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.width = "100%";
    tooltip.style.zIndex = "1";

    const levelName = document.createElement("span");
    levelName.textContent = `Level: ${level.name}`;
    tooltip.appendChild(levelName);

    //check if phases is nopt empty
    if (level.phases.length > 0) {
        const levelDescription = document.createElement("span");
        levelDescription.textContent = `${level.phases}`;
    }
    tooltip.appendChild(levelDescription);

    if (isTouch) {
        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Select";
        confirmButton.style.position = "absolute";
        confirmButton.style.bottom = "0";
        confirmButton.style.right = "0";
        confirmButton.style.backgroundColor = "green";
        confirmButton.style.color = "white";
        confirmButton.style.padding = "5px";
        confirmButton.style.border = "none";
        confirmButton.style.borderRadius = "5px";
        confirmButton.style.cursor = "pointer";
        confirmButton.onclick = () => {
            adversaryLabel.textContent = `Adversary: ${adversary.name} - Level: ${level.level} (${level.difficulty})`;
            adversariesContainer.style.height = "30px";
            adversarySelectBox.style.display = "none";
            adversarySelectBox.style.transition = "0s";
        }
        tooltip.appendChild(confirmButton);
    }
    return tooltip;
}
function createScenriosContainer() {
    var scenariosContainer = document.getElementById("scenarios");
    if (!scenariosContainer) {
        scenriosContainer = document.createElement("div");
        scenriosContainer.style.position = "absolute";
        scenriosContainer.style.bottom = "0";
        scenriosContainer.style.left = "0";
        scenriosContainer.style.width = "100%";
        scenriosContainer.style.display = "flex";
        scenriosContainer.style.flexDirection = "row";
        scenriosContainer.style.alignItems = "center";
    }
    return scenriosContainer;
}
function createScenrioBox(scenrio) {
    const scenrioBox = document.createElement("div");
    scenrioBox.style.position = "relative";
    scenrioBox.style.width = "100px";
    scenrioBox.style.height = "100px";
    scenrioBox.style.backgroundColor = "lightgreen";
    scenrioBox.style.border = "1px solid black";
    scenrioBox.style.borderRadius = "5px";
    scenrioBox.style.margin = "5px";
    scenrioBox.style.overflow = "hidden";

    const scenrioName = document.createElement("div");
    scenrioName.textContent = scenrio.name;
    scenrioName.style.position = "absolute";
    scenrioName.style.bottom = "0";
    scenrioName.style.left = "0";
    scenrioName.style.width = "100%";
    scenrioName.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    scenrioName.style.color = "white";
    scenrioName.style.textAlign = "center";
    scenrioName.style.padding = "5px";

    scenrioBox.appendChild(scenrioName);

    return scenrioBox;
}