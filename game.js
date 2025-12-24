let energy = 100;
let time = 0;
let cameraIndex = 0;
let doorClosed = false;
let lightOn = false;

const cameras = [
  "Sala Principal",
  "Corredor A",
  "Corredor B",
  "Depósito"
];

const enemy = {
  position: 3,
  aggressiveness: 0.2
};

// Atualiza HUD
function updateHUD() {
  document.getElementById("energy").innerText =
    `Energia: ${Math.max(energy, 0)}%`;

  const hour = 12 + Math.floor(time / 60);
  document.getElementById("time").innerText =
    `${hour > 12 ? hour - 12 : hour}:00 AM`;

  document.getElementById("cameraName").innerText =
    cameras[cameraIndex];
}

// Controles
function nextCamera() {
  cameraIndex = (cameraIndex + 1) % cameras.length;
  energy -= 1;
  updateHUD();
}

function prevCamera() {
  cameraIndex = (cameraIndex - 1 + cameras.length) % cameras.length;
  energy -= 1;
  updateHUD();
}

function toggleDoor() {
  doorClosed = !doorClosed;
  energy -= 2;
}

function toggleLight() {
  lightOn = !lightOn;
  energy -= 2;
}

// IA do inimigo
function enemyAI() {
  if (Math.random() < enemy.aggressiveness) {
    enemy.position--;
  }

  if (enemy.position <= 0) {
    if (!doorClosed) {
      alert("JUMPSCARE! Você perdeu.");
      location.reload();
    } else {
      enemy.position = 3;
    }
  }
}

// Loop principal
setInterval(() => {
  energy -= doorClosed ? 0.3 : 0.1;
  time++;
  enemyAI();

  if (energy <= 0) {
    alert("Sem energia! Game Over.");
    location.reload();
  }

  updateHUD();
}, 1000);
