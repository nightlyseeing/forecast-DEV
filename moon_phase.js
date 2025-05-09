
const moonPhases = [
  { name: "Nov", icon: "🌑" },
  { name: "Dorůstající srpek", icon: "🌒" },
  { name: "První čtvrť", icon: "🌓" },
  { name: "Dorůstající měsíc", icon: "🌔" },
  { name: "Úplněk", icon: "🌕" },
  { name: "Couvající měsíc", icon: "🌖" },
  { name: "Poslední čtvrť", icon: "🌗" },
  { name: "Couvající srpek", icon: "🌘" }
];

function getPhaseIndex(value) {
  if (value < 0.0625 || value >= 0.9375) return 0; // Nov
  if (value < 0.1875) return 1; // Dorůstající srpek
  if (value < 0.3125) return 2; // První čtvrť
  if (value < 0.4375) return 3; // Dorůstající měsíc
  if (value < 0.5625) return 4; // Úplněk
  if (value < 0.6875) return 5; // Couvající měsíc
  if (value < 0.8125) return 6; // Poslední čtvrť
  return 7; // Couvající srpek
}

async function fetchMoonPhase(lat, lon) {
  const url = `https://api.open-meteo.com/v1/astronomy?latitude=${lat}&longitude=${lon}&timezone=Europe%2FPrague`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const phaseValue = data.moon_phase;
    const index = getPhaseIndex(phaseValue);
    const { name, icon } = moonPhases[index];

    const container = document.getElementById("locationInfoBox");
    const moonInfo = document.createElement("div");
    moonInfo.className = "moon-dynamic";
    moonInfo.innerHTML = `
      <div><strong>Fáze Měsíce:</strong> ${icon} ${name} (${Math.round(phaseValue * 100)}%)</div>
      <div><strong>Východ:</strong> ${data.moonrise} &nbsp;&nbsp; <strong>Západ:</strong> ${data.moonset}</div>
    `;

    const old = container.querySelector('.moon-dynamic');
    if (old) old.remove();
    container.appendChild(moonInfo);

  } catch (error) {
    console.error("Chyba při načítání fáze Měsíce:", error);
  }
}
