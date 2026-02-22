const storyContainer = document.getElementById("story-text");
const choicesContainer = document.getElementById("choices");
const pathList = document.getElementById("path-list");

let visitedNodes = [];

function goToNode(nodeId) {
  const node = storyData[nodeId];
  if (!node) {
    storyContainer.textContent = "Error: story node not found!";
    return;
  }

  visitedNodes.push(nodeId);

  // Update story text — preserve paragraph breaks using safe DOM methods
  while (storyContainer.firstChild) {
    storyContainer.removeChild(storyContainer.firstChild);
  }
  const paragraphs = node.text.split("\n\n");
  paragraphs.forEach((p) => {
    const el = document.createElement("p");
    el.textContent = p;
    storyContainer.appendChild(el);
  });

  // Update choices
  while (choicesContainer.firstChild) {
    choicesContainer.removeChild(choicesContainer.firstChild);
  }
  if (node.ending) {
    const badge = document.createElement("div");
    badge.className = "ending-badge";
    badge.textContent = "The End";
    choicesContainer.appendChild(badge);

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Adventure";
    restartBtn.className = "choice-btn restart-btn";
    restartBtn.addEventListener("click", () => {
      visitedNodes = [];
      goToNode("start");
    });
    choicesContainer.appendChild(restartBtn);
  } else {
    node.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.textContent = choice.label;
      btn.className = "choice-btn";
      btn.addEventListener("click", () => goToNode(choice.target));
      choicesContainer.appendChild(btn);
    });
  }

  // Update path tracker
  updatePath();

  // Scroll to top of story
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updatePath() {
  while (pathList.firstChild) {
    pathList.removeChild(pathList.firstChild);
  }
  visitedNodes.forEach((id, i) => {
    const li = document.createElement("li");
    li.textContent = id.replace(/_/g, " ");
    if (i === visitedNodes.length - 1) {
      li.classList.add("current");
    }
    pathList.appendChild(li);
  });
}

// Start the adventure
goToNode("start");
