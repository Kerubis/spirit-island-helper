function renderGameSetup(adversaries, scenrios) {
    const adversariesContainer = createadversariesContainer(adversaries);
    const scenriosContainer = createScenriosContainer();

    const content = document.getElementById("content");
    // content.innerHTML = "";
    content.appendChild(adversariesContainer);
    content.appendChild(scenriosContainer);
}

function createadversariesContainer(adversaries) {
    var adversariesContainer = document.getElementById("adversaries");
    if (!adversariesContainer) {
        adversariesContainer = document.createElement("div");
        adversariesContainer.style.position = "absolute";
        adversariesContainer.style.top = "0";
        adversariesContainer.style.left = "0";
        adversariesContainer.style.right = "0";
        adversariesContainer.style.height = "50px";
        adversariesContainer.style.margin = "10px";
        adversariesContainer.style.display = "flex";
        adversariesContainer.style.flexDirection = "row";
        adversariesContainer.style.alignItems = "center";
        adversariesContainer.style.justifyContent = "center";
        adversariesContainer.style.boxShadow = "0 0 5px 2px rgba(0, 0, 0, 0.5)";
        adversariesContainer.style.cursor = "pointer";
    }

    const adversarySelection = document.createElement("div");
    adversariesContainer.appendChild(adversarySelection);

    const adversaryLabel = document.createElement("label");
    adversaryLabel.textContent = "Adversary:";
    adversarySelection.appendChild(adversaryLabel);

    const adversarySelectBox = document.createElement("div");
    adversarySelectBox.style.display = "none";
    adversarySelectBox.style.position = "absolute";
    adversarySelectBox.style.top = "70px";
    adversarySelectBox.style.left = "20px";
    adversarySelectBox.style.right = "20px";
    adversarySelectBox.style.bottom = "20px";

    adversariesContainer.appendChild(adversarySelectBox);

    adversaries.forEach(adversary => {
        const adversaryBox = createAdvasaryBox(adversary);
        adversaryBox.onclick = (event) => {
            event.stopPropagation();
            event.preventDefault();
            adversaryLabel.textContent = `Adversary: ${adversary.name}`;
            adversarySelectBox.style.display = "none";
        }
        adversarySelectBox.appendChild(adversaryBox);

        adversary.levels.forEach(level => {
            adversariesLevelsBox = document.createElement("div");
            adversariesLevelsBox.style.display = "flex";
            adversariesLevelsBox.style.flexDirection = "row";
            adversariesLevelsBox.style.justifyContent = "center";
            adversariesLevelsBox.style.alignItems = "center";

            const levelLabel = document.createElement("label");
            levelLabel.textContent = level;

            adversariesLevelsBox.appendChild(levelLabel);
            adversarySelectBox.appendChild(adversariesLevelsBox);
        });
    });


    //on click the adversarySelection show the adversarySelectBox
    adversariesContainer.onclick = () => {
        if (adversarySelectBox.style.display === "block") {
            adversarySelectBox.style.display = "none";
            return;
        }
        adversarySelectBox.style.display = "block";
    }

    return adversariesContainer;
}
function createAdvasaryBox(advasary) {
    const adversaryBox = document.createElement("div");
    adversaryBox.style.position = "relative";
    adversaryBox.style.width = "100%";
    adversaryBox.style.height = "30px";
    adversaryBox.style.boxShadow = "0 0 5px 2px rgba(0, 0, 0, 0.5)";
    adversaryBox.style.backgroundColor = "#cb8351";
    adversaryBox.style.borderRadius = "5px";
    adversaryBox.style.margin = "10px";
    adversaryBox.style.overflow = "hidden";

    const advasaryName = document.createElement("div");
    advasaryName.textContent = advasary.name;
    advasaryName.style.position = "absolute";
    advasaryName.style.bottom = "0";
    advasaryName.style.left = "0";
    advasaryName.style.width = "100%";
    advasaryName.style.textAlign = "center";
    advasaryName.style.padding = "5px";

    adversaryBox.appendChild(advasaryName);

    return adversaryBox;
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