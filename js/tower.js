// Danh sách quái vật và tower có thể khắc chế
const enemyData = [
    { name: "Quái bay", counter: ["Lính đánh trên trời"] },
    { name: "Quái tàng hình", counter: ["Lính đánh tàng hình"] },
    { name: "Quái giáp (Tank)", counter: ["Lính đánh xuyên giáp"] },
    { name: "Quái chạy nhanh", counter: ["Lính khống chế"] },
    { name: "Quái gây choáng", counter: ["Lính hỗ trợ"] },
    { name: "BOSS", counter: ["Lính đánh trên trời", "Lính đánh xuyên giáp", "Lính khống chế"] } // Boss cần nhiều loại khắc chế
];

const towers = [
    "Lính đánh trên trời",
    "Lính đánh tàng hình",
    "Lính đánh xuyên giáp",
    "Lính khống chế",
    "Lính hỗ trợ"
];

// Biến lưu số lần thắng liên tiếp
let winStreak = 0;

// Lấy các phần tử từ HTML
const enemyContainer = document.getElementById("enemy-container");
const towerOptions = document.getElementById("tower-options");
const gameResult = document.getElementById("game-result");

// Tạo nút chọn Tower
towers.forEach(tower => {
    let btn = document.createElement("button");
    btn.classList.add("tower-btn");
    btn.innerText = tower;
    btn.onclick = () => checkAnswer(tower);
    towerOptions.appendChild(btn);
});

// Chọn quái vật ngẫu nhiên
let currentEnemy = null;
function generateEnemy() {
    currentEnemy = enemyData[Math.floor(Math.random() * enemyData.length)];
    enemyContainer.innerText = `⚔️ Quái vật: ${currentEnemy.name}`;
}

// Kiểm tra câu trả lời
function checkAnswer(selectedTower) {
    if (currentEnemy.counter.includes(selectedTower)) {
        winStreak++;
        gameResult.innerText = `✅ Đúng! (Chuỗi thắng: ${winStreak}/5)`;

        if (winStreak === 5) {
            gameResult.innerText = "🏆 Bạn đã chiến thắng mini-game!";
            winStreak = 0; // Reset chuỗi thắng
        } else {
            setTimeout(generateEnemy, 1000);
        }
    } else {
        gameResult.innerText = `❌ Sai rồi! Bạn cần dùng "${currentEnemy.counter.join(", ")}" để khắc chế.`;
        winStreak = 0; // Reset chuỗi thắng
    }
}

// Khởi động game
generateEnemy();
