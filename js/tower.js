const monsterTypes = [
    { name: "Quái vật bay", counter: "Lính Đánh Trên Trời" },
    { name: "Quái vật tàng hình", counter: "Lính Tàng Hình" },
    { name: "Quái vật giáp dày", counter: "Lính Xuyên Giáp" },
    { name: "Quái vật chạy nhanh", counter: "Lính Khống Chế" },
    { name: "Quái vật gây choáng", counter: "Lính Hỗ Trợ" },
  ];
  
  const towers = [
    { name: "Pursuit", type: "Lính Đánh Trên Trời", img: "../img_tower/Pursuit.png" },
    { name: "Ace Pilot", type: "Lính Đánh Trên Trời", img: "../img_tower/Ace Pilot.png" },
    { name: "Militant", type: "Lính Đánh Trên Trời", img: "../img_tower/Militant.png" },
    { name: "Warden", type: "Lính Tàng Hình", img: "../img_tower/Warden.png" },
    { name: "Golden Scout", type: "Lính Tàng Hình", img: "../img_tower/Golden Scout.png" },
    { name: "Minigunner", type: "Lính Tàng Hình", img: "../img_tower/Minigunner.png" },
    { name: "Accelerator", type: "Lính Xuyên Giáp", img: "../img_tower/Accelerator.png" },
    { name: "Engineer", type: "Lính Xuyên Giáp", img: "../img_tower/EngineerIcon.png" },
    { name: "Ranger", type: "Lính Xuyên Giáp", img: "../img_tower/Ranger.png" },
    { name: "Freezer", type: "Lính Khống Chế", img: "../img_tower/Freezer.png" },
    { name: "Electroshocker", type: "Lính Khống Chế", img: "../img_tower/Electroshocker.png" },
    { name: "Toxic Gunner", type: "Lính Khống Chế", img: "../img_tower/ToxicGIcon.png" },
    { name: "Medic", type: "Lính Hỗ Trợ", img: "../img_tower/Medic.png" },
    { name: "DJ Booth", type: "Lính Hỗ Trợ", img: "../img_tower/DJ Booth.png" },
    { name: "Commander", type: "Lính Hỗ Trợ", img: "../img_tower/Commander.png" },
  ];
  
  let currentMonster;
  
  function startGame() {
    document.getElementById("result").innerText = "";
    currentMonster = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    document.getElementById("monsterCard").innerText = `Thẻ bài: ${currentMonster.name}`;
    renderOptions();
  }
  
  function renderOptions() {
    const container = document.getElementById("cardOptions");
    container.innerHTML = "";
  
    const validTowers = towers.filter(t => t.type === currentMonster.counter);
    const randomValid = validTowers[Math.floor(Math.random() * validTowers.length)];
  
    const shuffledWrong = towers
      .filter(t => t.name !== randomValid.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
  
    const finalOptions = [...shuffledWrong, randomValid].sort(() => Math.random() - 0.5);
  
    finalOptions.forEach(tower => {
      const card = document.createElement("div");
      card.className = "tower-card";
      card.onclick = () => checkAnswer(tower);
  
      const img = document.createElement("img");
      img.src = tower.img;
      img.alt = tower.name;
  
      const label = document.createElement("p");
      label.innerHTML = `<strong>${tower.name}</strong>`;
  
      card.appendChild(img);
      card.appendChild(label);
      container.appendChild(card);
    });
  }
  
  function checkAnswer(tower) {
    if (tower.type === currentMonster.counter) {
      document.getElementById("result").innerHTML = "✅ Chính xác! Tower này khắc chế được quái vật.";
    } else {
      document.getElementById("result").innerHTML =
        `❌ Sai rồi! Tower này không hiệu quả.<br>→ Gợi ý: Dùng <strong>${currentMonster.counter}</strong>`;
    }
  }
  