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

const springbonnie = {
  name: "Springbonnie",
  position: 3,
  aggressiveness: 0.25
};

function updateHUD() {
  document.getElementById("energy").innerText =
    `Energia: ${Math.floor(energy)}%`;

  const hour = 12 + Math.floor(time / 60);
  document.getElementById("time").innerText =
    `${hour > 12 ? hour - 12 : hour}:00 AM`;

  document.getElementById("cameraName").innerText =
    cameras[cameraIndex];

  const enemyText = springbonnie.position === cameraIndex
    ? `Springbonnie está AQUI`
    : `Springbonnie não está nesta sala`;

  document.getElementById("enemyStatus").innerText = enemyText;

  document.getElementById("officeStatus").innerText =
    doorClosed
      ? "Porta FECHADA"
      : "Porta ABERTA";
}

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
  energy -= 1;
  document.getElementById("office").classList.toggle("light-on", lightOn);
}

function springbonnieAI() {
  if (Math.random() < springbonnie.aggressiveness) {
    springbonnie.position--;
  }

  if (springbonnie.position < 0) {
    if (!doorClosed) {
      alert("Springbonnie entrou no escritório!");
      location.reload();
    } else {
      springbonnie.position = 3;
    }
  }
}

setInterval(() => {
  energy -= doorClosed ? 0.4 : 0.15;
  time++;
  springbonnieAI();

  if (energy <= 0) {
    alert("Sem energia!");
    location.reload();
  }

  updateHUD();
}, 1000);
