function renderGameSetup(adversaries, scenrios) {

    const adversariesContainer = createadversariesContainer();
    adversaries.forEach(adversary => {
        const adversaryBox = createAdvasaryBox(adversary);
        adversariesContainer.appendChild(adversaryBox);
    });
    const scenriosContainer = createScenriosContainer();
    // scenrios.forEach(scenrio => {
    //     const scenrioBox = createScenrioBox(scenrio);
    //     scenriosContainer.appendChild(scenrioBox);
    // });

    const content = document.getElementById("content");
    // content.innerHTML = "";
    content.appendChild(adversariesContainer);
    content.appendChild(scenriosContainer);
}

function createadversariesContainer() {
    var adversariesContainer = document.getElementById("adversaries");
    if (!adversariesContainer) {
        adversariesContainer = document.createElement("div");
        adversariesContainer.style.position = "absolute";
        adversariesContainer.style.top = "0";
        adversariesContainer.style.left = "0";
        adversariesContainer.style.width = "100%";
        adversariesContainer.style.display = "flex";
        adversariesContainer.style.flexDirection = "row";
        adversariesContainer.style.alignItems = "center";
    }
    return adversariesContainer;
}
function createAdvasaryBox(advasary) {
    const adversaryBox = document.createElement("div");
    adversaryBox.style.position = "relative";
    adversaryBox.style.width = "100px";
    adversaryBox.style.height = "100px";
    adversaryBox.style.backgroundColor = "lightblue";
    adversaryBox.style.border = "1px solid black";
    adversaryBox.style.borderRadius = "5px";
    adversaryBox.style.margin = "5px";
    adversaryBox.style.overflow = "hidden";

    const advasaryName = document.createElement("div");
    advasaryName.textContent = advasary.name;
    advasaryName.style.position = "absolute";
    advasaryName.style.bottom = "0";
    advasaryName.style.left = "0";
    advasaryName.style.width = "100%";
    advasaryName.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    advasaryName.style.color = "white";
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