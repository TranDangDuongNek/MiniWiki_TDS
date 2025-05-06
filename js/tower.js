// kiem tra xem dang o tower hay monster
let jsonPath = "../data/";
if (location.pathname.includes("tower.html")) {
  jsonPath += "towers.json";
} else if (location.pathname.includes("monster.html")) {
  jsonPath += "units.json";
}

async function loadSectionData() {
  const response = await fetch(jsonPath);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

function createItemCard(item) {
  const card = document.createElement("div");

  const img = document.createElement("img");
  img.src = item.img; // Set image source
  img.alt = item.name; // Set alt text for image

  const p = document.createElement("p");
  p.textContent = item.name; // Set text content for the paragraph

  card.appendChild(img); // Append image to div
  card.appendChild(p); // Append paragraph to div

  return card;
}

function createSectionCard(sectionObj) {
  // Assuming you already have the category name and tower data
  const categoryName = sectionObj.name; // Example category name

  // Create the section for the category
  const section = document.createElement("section");
  section.classList.add("tower-category");

  // Create the heading for the category
  const h2 = document.createElement("h2");
  h2.textContent = categoryName;

  // Create the container for the tower cards
  const towerGrid = document.createElement("div");
  towerGrid.classList.add("tower-grid");

  // Loop through towers and create cards
  sectionObj.items?.forEach((item) => {
    towerGrid.appendChild(createItemCard(item));
  });

  // Append heading and grid to the section
  section.appendChild(h2);
  section.appendChild(towerGrid);

  // Append the section to a parent element in the DOM (e.g., body or a specific div)
  return section;
}

document.addEventListener("DOMContentLoaded", async () => {
  const sectionData = await loadSectionData();

  const container = document.getElementById("sections");
  sectionData.forEach((section) => {
    const sectionCard = createSectionCard(section);
    container.appendChild(sectionCard);
  });
});
