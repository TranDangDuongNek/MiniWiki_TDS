function waitForTowersAndStart() {
  const interval = setInterval(() => {
    const sections = document.querySelectorAll(".tower-category");
    if (sections.length && document.querySelector(".tower-grid > div")) {
      clearInterval(interval);
      setupGame(); // towers are ready, start game logic
    }
  }, 100);
}

function setupGame() {
  const sections = document.querySelectorAll(".tower-category");
  const allTowers = [];

  sections.forEach((section) => {
    const category = section.querySelector("h2").textContent.trim();
    const cards = section.querySelectorAll(".tower-grid > div");

    cards.forEach((card) => {
      allTowers.push({
        element: card.cloneNode(true),
        type: category,
        name: card.querySelector("p").textContent.trim(),
      });
    });
  });

  function getRandomCards(count = 6) {
    const shuffled = allTowers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  function showCardOptions() {
    const cardOptions = document.getElementById("cardOptions");
    cardOptions.innerHTML = "";

    const selectedCards = getRandomCards();

    // Randomly choose the correct answer from selected cards
    const correctTower =
      selectedCards[Math.floor(Math.random() * selectedCards.length)];
    const correctType = correctTower.type;

    // Store correctType in closure for check
    selectedCards.forEach((tower) => {
      const cardClone = tower.element;
      cardClone.style.cursor = "pointer";
      cardClone.addEventListener("click", () =>
        checkAnswer(tower, correctType)
      );
      cardOptions.appendChild(cardClone);
    });

    document.getElementById(
      "monsterCard"
    ).innerHTML = `❓ Chọn tower phù hợp với nhóm: <strong>${correctType}</strong>`;
  }

  function checkAnswer(tower, correctType) {
    if (tower.type === correctType) {
      document.getElementById("result").innerHTML =
        "✅ Chính xác! Tower này thuộc nhóm đúng.";
    } else {
      document.getElementById(
        "result"
      ).innerHTML = `❌ Sai rồi! Tower này thuộc nhóm <strong>${tower.type}</strong>.<br>→ Gợi ý: Nhóm đúng là <strong>${correctType}</strong>`;
    }
  }

  showCardOptions();
}

document.getElementById("startGame").addEventListener("click", () => {
  document.getElementById("result").innerHTML = ""; // Clear previous result
  document.getElementById("cardOptions").innerHTML = ""; // Clear previous options
  waitForTowersAndStart();
});
