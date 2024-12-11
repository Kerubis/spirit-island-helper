function renderGameSetup(adversaries, scenrios) {
    const content = document.getElementById("content");
    var gameSetupContainer = document.getElementById("gameSetup");
    if (!gameSetupContainer) {
        gameSetupContainer = document.createElement("div");
        gameSetupContainer.id = "gameSetup";
        gameSetupContainer.style.position = "absolute";
        gameSetupContainer.style.top = "0";
        gameSetupContainer.style.left = "0";
        gameSetupContainer.style.right = "0";
        gameSetupContainer.style.bottom = "50px";
    }
    content.appendChild(gameSetupContainer);

    const adversariesContainer = createadversariesContainer(adversaries);
    const scenriosContainer = createScenriosContainer();

    gameSetupContainer.appendChild(adversariesContainer);
    gameSetupContainer.appendChild(scenriosContainer);
}

function createadversariesContainer(adversaries) {
    adversariesContainer = document.createElement("div");
    adversariesContainer.style.position = "absolute";
    adversariesContainer.style.top = "10px";
    adversariesContainer.style.left = "10px";
    adversariesContainer.style.right = "10px";
    adversariesContainer.style.height = "30px";
    adversariesContainer.style.boxShadow = "0 0 5px 2px rgba(0, 0, 0, 0.5)";
    adversariesContainer.style.transition = "0.5s";
    adversariesContainer.style.boxSizing = "border-box";

    const adversarySelector = createAdvasarySelector();
    const adversaryLabel = createAdversaryLabel("Select Adversary");
    const adversarySelectBox = createAdversarySelectBox();


    adversariesContainer.appendChild(adversarySelector);
    adversarySelector.appendChild(adversaryLabel);
    adversariesContainer.appendChild(adversarySelectBox);

    adversaries.forEach(adversary => {
        const adversaryBox = createAdvasaryBox(adversary);
        adversarySelectBox.appendChild(adversaryBox);
        adversarySelectBox.onclick = () => {
            const tooltips = document.querySelectorAll(".tooltip");
            tooltips.forEach(tooltip => tooltip.remove());

            const tooltipPosition = adversaryBox.getBoundingClientRect().bottom + 10;
            const tooltip = createAdversaryTooltip(adversary, tooltipPosition);
            adversarySelectBox.appendChild(tooltip);
        }
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
    adversaryBox.style.backgroundColor = "rgb(225,220,190)";
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
function createAdversaryTooltip(adversary, position) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.style.position = "fixed";
    tooltip.style.top = `${position}px`;
    tooltip.style.left = `50%`;
    tooltip.style.transform = `translateX(-50%)`;
    tooltip.style.color = "black";
    tooltip.style.borderRadius = "15px";
    tooltip.style.width = "900px";
    tooltip.style.height = "600px";
    tooltip.style.zIndex = "1";
    tooltip.style.overflow = "auto";
    tooltip.style.boxShadow = "0 0 5px 2px rgba(0, 0, 0, 0.5)";

    const tooltipHeader = document.createElement("div");
    tooltipHeader.style.position = "absolute";
    tooltipHeader.style.top = "0";
    tooltipHeader.style.left = "0";
    tooltipHeader.style.right = "0";
    tooltipHeader.style.height = "36px";
    tooltipHeader.style.backgroundColor = "rgb(225,220,190)";
    tooltipHeader.style.borderBottom = "3px solid rgb(94, 92, 86)";
    tooltip.appendChild(tooltipHeader);

    const adveraryNameLabel = document.createElement("label");
    adveraryNameLabel.textContent = adversary.name;
    adveraryNameLabel.style.position = "absolute";

    return tooltip;
    
    levels.sort((a, b) => b.level - a.level);
    levels.forEach(level => {
        const adversariesLevelsBox = document.createElement("div");
        adversariesLevelsBox.style.display = "flex";
        adversariesLevelsBox.style.float = "right";
        adversariesLevelsBox.style.padding = "5px";

        const levelLabel = document.createElement("label");
        levelLabel.textContent = `Level: ${level.level} (${level.difficulty})`;

        adversariesLevelsBox.appendChild(levelLabel);
        tooltip.appendChild(adversariesLevelsBox);
    });

    const levelName = document.createElement("p");
    levelName.textContent = `Level: ${level.name}`;
    tooltip.appendChild(levelName);

    const fearCards = document.createElement("p");
    //sum the fear cards from the
    const fearCardsTotal = level.fearCards.reduce((acc, val) => acc + val);
    fearCards.textContent = `Fear Cards: ${fearCardsTotal}`;
    tooltip.appendChild(fearCards);

    if (level.phases.length > 0) {
        level.phases.forEach(phase => {
            const phaseDescription = document.createElement("p");
            phaseDescription.textContent = phase.name;
            tooltip.appendChild(phaseDescription);
            if (phase.steps.length > 0) {
                phase.steps.forEach(step => {
                    const stepName = document.createElement("p");
                    stepName.textContent = step.name;
                    tooltip.appendChild(stepName);

                    const stepDescription = document.createElement("p");
                    stepDescription.textContent = step.description;
                    tooltip.appendChild(stepDescription);
                });
            }
        });
    }

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