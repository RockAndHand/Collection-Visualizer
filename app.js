/* =========================
   GLOBAL STATE
========================= */

let data = [];
let currentStructure = "arraylist";

/* =========================
   DOM ELEMENTS
========================= */

const visualization = document.getElementById("visualizationArea");
const input = document.getElementById("valueInput");

const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

const explanation = document.getElementById("explainText");

const structureButtons = document.querySelectorAll(".structure-btn");

/* =========================
   STRUCTURE SWITCHING
========================= */

structureButtons.forEach((button) => {
  button.addEventListener("click", () => {
    structureButtons.forEach((b) => b.classList.remove("active"));

    button.classList.add("active");

    currentStructure = button.dataset.structure;

    data = [];

    explanation.textContent = `Switched to ${currentStructure}`;

    render();
  });
});

/* =========================
   MAIN RENDER ROUTER
========================= */

function render() {
  visualization.innerHTML = "";

  if (data.length === 0) {
    visualization.innerHTML = `<p class="placeholder">No elements yet</p>`;
    return;
  }

  if (currentStructure === "arraylist") renderArrayList();
  if (currentStructure === "stack") renderStack();
  if (currentStructure === "queue") renderQueue();
  if (currentStructure === "hashset") renderHashSet();
  if (currentStructure === "linkedlist") renderLinkedList();
}

/* =========================
   ARRAYLIST VIEW
========================= */

function renderArrayList() {
  const indexRow = document.createElement("div");
  const elementRow = document.createElement("div");

  indexRow.style.display = "flex";
  elementRow.style.display = "flex";

  data.forEach((value, index) => {
    const indexBox = document.createElement("div");
    indexBox.textContent = index;
    indexBox.style.width = "55px";
    indexBox.style.textAlign = "center";
    indexBox.style.fontSize = "12px";
    indexBox.style.color = "#6b7280";

    const box = document.createElement("div");
    box.className = "box";
    box.textContent = value;

    indexRow.appendChild(indexBox);
    elementRow.appendChild(box);
  });

  visualization.appendChild(indexRow);
  visualization.appendChild(elementRow);
}

/* =========================
   STACK VIEW
========================= */

function renderStack() {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.flexDirection = "column-reverse";
  container.style.alignItems = "center";

  data.forEach((value) => {
    const box = document.createElement("div");
    box.className = "box";
    box.textContent = value;

    container.appendChild(box);
  });

  const label = document.createElement("p");
  label.textContent = "TOP";
  label.style.marginTop = "10px";

  visualization.appendChild(container);
  visualization.appendChild(label);
}

/* =========================
   QUEUE VIEW
========================= */

function renderQueue() {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.alignItems = "center";

  const front = document.createElement("span");
  front.textContent = "Front → ";

  const rear = document.createElement("span");
  rear.textContent = " ← Rear";

  container.appendChild(front);

  data.forEach((value) => {
    const box = document.createElement("div");
    box.className = "box";
    box.textContent = value;

    container.appendChild(box);
  });

  container.appendChild(rear);

  visualization.appendChild(container);
}

/* =========================
   LINKEDLIST VIEW
========================= */

function renderLinkedList() {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.alignItems = "center";

  data.forEach((value, index) => {
    const node = document.createElement("div");
    node.className = "node";

    node.textContent = value;

    container.appendChild(node);

    if (index < data.length - 1) {
      const arrow = document.createElement("span");

      arrow.className = "arrow";

      arrow.textContent = "→";

      container.appendChild(arrow);
    }
  });

  visualization.appendChild(container);
}

/* =========================
   HASHSET VIEW
========================= */

function renderHashSet() {
  const container = document.createElement("div");

  container.style.display = "flex";
  container.style.flexWrap = "wrap";

  data.forEach((value) => {
    const box = document.createElement("div");
    box.className = "box";
    box.textContent = value;

    container.appendChild(box);
  });

  visualization.appendChild(container);
}

/* =========================
   ADD ELEMENT
========================= */

addBtn.addEventListener("click", () => {
  const value = input.value;

  if (value === "") return;

  if (currentStructure === "hashset" && data.includes(value)) {
    explanation.textContent = "HashSet cannot contain duplicate values";

    return;
  }

  data.push(value);

  if (currentStructure === "stack") explanation.textContent = `Pushed ${value}`;
  else if (currentStructure === "queue")
    explanation.textContent = `Enqueued ${value}`;
  else if (currentStructure === "arraylist")
    explanation.textContent = `Inserted ${value} at index ${data.length - 1}`;
  else explanation.textContent = `Inserted ${value}`;

  input.value = "";

  render();
});

/* =========================
   REMOVE ELEMENT
========================= */

removeBtn.addEventListener("click", () => {
  if (data.length === 0) return;

  let removed;

  if (currentStructure === "queue") removed = data.shift();
  else removed = data.pop();

  explanation.textContent = `Removed ${removed}`;

  render();
});

/* =========================
   SEARCH ELEMENT
========================= */

searchBtn.addEventListener("click", () => {
  if (data.length === 0) return;

  const value = input.value;

  const index = data.indexOf(value);

  if (index === -1) {
    explanation.textContent = `Element ${value} not found`;

    return;
  }

  explanation.textContent = `Element ${value} found at index ${index}`;

  highlight(index);
});

/* =========================
   RESET
========================= */

resetBtn.addEventListener("click", () => {
  data = [];

  explanation.textContent = "Structure cleared";

  render();
});

/* =========================
   HIGHLIGHT FUNCTION
========================= */

function highlight(index) {
  const boxes = document.querySelectorAll(".box");

  if (index < 0 || index >= boxes.length) return;

  const box = boxes[index];

  box.classList.add("searching");

  setTimeout(() => {
    box.classList.remove("searching");
  }, 600);
}

/* =========================
   INITIAL RENDER
========================= */

render();
