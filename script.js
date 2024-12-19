let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
const clockNumbers = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

function setup() {
  let canvas = createCanvas(400, 400); // Tamaño reducido
  canvas.parent('canvasContainer');
  stroke(255);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.72;
  minutesRadius = radius * 0.60;
  hoursRadius = radius * 0.50;
  clockDiameter = radius * 1.8;

  cx = width / 2;
  cy = height / 2;
}

function draw() {
  background('blue');
  
  // Dibujar el fondo del reloj
  fill('black');
  noStroke();
  ellipse(cx, cy, clockDiameter, clockDiameter);

  // Dibujar el bisel dorado
  stroke('gold');
  strokeWeight(20); // Ancho del bisel reducido
  noFill();
  ellipse(cx, cy, clockDiameter + 20, clockDiameter + 20);

  // Dibujar la hora digital
  drawDigitalTime(cx, cy - clockDiameter / 5, 'gold');

  // Dibujar "Hershey’s" más al centro, arriba de las manecillas
  drawBrandTextChangingColors("Hershey’s", cx, cy - clockDiameter / 12, 24);

  // Dibujar la marca "Carlos Guzmán" más al centro, debajo del centro
  drawBrandTextChangingColors("Carlos Guzmán", cx, cy + clockDiameter / 8, 16);

  // Ángulos para sin() y cos() empiezan a las 3 en punto;
  // restar HALF_PI para que empiecen en la parte superior
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI; 
  let h = map(hour() % 12 + norm(minute(), 0, 60), 0, 12, 0, TWO_PI) - HALF_PI;

  // Dibujar las manecillas del reloj
  stroke('gold'); // Color de la manecilla de segundos
  strokeWeight(2); // Grosor de la manecilla de segundos
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);

  stroke('silver'); // Color de la manecilla de minutos
  strokeWeight(4); // Grosor de la manecilla de minutos
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);

  stroke('red'); // Color de la manecilla de horas
  strokeWeight(6); // Grosor de la manecilla de horas
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Dibujar las marcas de los minutos y números del reloj
  textAlign(CENTER, CENTER);
  textSize(16); // Tamaño del texto reducido
  fill('white');
  strokeWeight(2);
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI) - HALF_PI;
    let x = cx + cos(angle) * (secondsRadius - 30);
    let y = cy + sin(angle) * (secondsRadius - 30);
    text(clockNumbers[i], x, y);
  }

  // Actualizar el reloj digital
  updateDigitalClock();
}

function drawDigitalTime(x, y, color) {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;

  textAlign(CENTER, CENTER);
  textSize(24); // Tamaño del texto reducido
  fill(color);
  noStroke();
  text(timeString, x, y);
}

function drawBrandTextChangingColors(txt, x, y, textSizeValue) {
  let t = frameCount / 60;
  textAlign(CENTER, CENTER);
  textSize(textSizeValue); // Tamaño del texto personalizado
  noStroke();
  for (let i = 0; i < txt.length; i++) {
    let c = color(
      127 + 127 * sin(TWO_PI * t + i),
      127 + 127 * sin(TWO_PI * t + i + PI / 3),
      127 + 127 * sin(TWO_PI * t + i + 2 * PI / 3)
    );
    fill(c);
    text(txt.charAt(i), x + (i - txt.length / 2) * 15, y); // Ajustado el espaciado
  }
}

function updateDigitalClock() {
  const digitalClock = document.getElementById('digitalClock');
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
}
