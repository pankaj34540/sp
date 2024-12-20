// DOM Elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const customizeBtn = document.getElementById("customizeBtn");
const gameTitle = document.getElementById("gameTitle");

// Canvas Size
canvas.width = 600;
canvas.height = 400;

// Game Variables
let score = 0;
let level = 1;
let gameSpeed = 2;
let objects = [];
let animationFrame;

// Game Object Class
class GameObject {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
        this.y += gameSpeed;
        this.draw();
    }
}

// Create Random Objects
function createObjects() {
    const size = 20; // Object size
    const x = Math.random() * (canvas.width - size);
    objects.push(new GameObject(x, -size, size, "red"));
}

// Update and Draw Game
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach((obj, index) => {
        obj.update();

        // Remove object if it goes off-screen
        if (obj.y > canvas.height) {
            objects.splice(index, 1);
            score += 10;

            // Level Up Condition
            if (score % 100 === 0) {
                level++;
                gameSpeed += 0.5;
            }
        }
    });

    // Update UI
    scoreElement.textContent = score;
    levelElement.textContent = level;

    animationFrame = requestAnimationFrame(updateGame);
}

// Start the Game
function startGame() {
    setInterval(createObjects, 1000); // Add objects every second
    animationFrame = requestAnimationFrame(updateGame);
}

// Customize Game Title and Canvas Color
customizeBtn.addEventListener("click", () => {
    const newTitle = prompt("Enter a new game name:");
    const newColor = prompt("Enter canvas background color (e.g., #333):");

    if (newTitle) gameTitle.textContent = newTitle;
    if (newColor) canvas.style.backgroundColor = newColor;
});

// External Link Redirection Every 15 Seconds
setInterval(() => {
    window.open("https://example.com", "_blank");
}, 15000);

// Start Game
startGame();
