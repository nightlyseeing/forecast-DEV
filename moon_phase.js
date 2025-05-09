const moonPhases = [
  "Nov", "Dorůstající srpek", "První čtvrť", "Dorůstající měsíc",
  "Úplněk", "Couvající měsíc", "Poslední čtvrť", "Couvající srpek"
];

function getPhaseIndex(value) {
  // Rozdělíme fázi do 8 kategorií (0.0 - 1.0)
  const phase = value % 1;
  return Math.floor(phase * 8);
}

async function fetchMoonPhase(lat, lon) {
  const url = `https://api.open-meteo.com/v1/astronomy?latitude=${lat}&longitude=${lon}&timezone=Europe%2FPrague`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const phaseValue = data.moon_phase;
    const index = getPhaseIndex(phaseValue);
    const name = moonPhases[index];

    // Odpovídající SVG z veřejného repozitáře
    const spriteIndex = Math.round(phaseValue * 29); // 0–29
    const imageUrl = `https://cdn.jsdelivr.net/gh/yyatsenkov/moon-phase-icons@main/icons/moon_${spriteIndex}.svg`;

    const container = document.getElementById("locationInfoBox");
    const moonInfo = document.createElement("div");
    moonInfo.className = "moon-dynamic";
    moonInfo.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${imageUrl}" alt="Fáze Měsíce" style="width:64px; height:64px;">
        <div>
          <div><strong>Fáze Měsíce:</strong> ${name} (${Math.round(phaseValue * 100)}%)</div>
          <div><strong>Východ:</strong> ${data.moonrise} &nbsp;&nbsp; <strong>Západ:</strong> ${data.moonset}</div>
        </div>
      </div>
    `;

    const old = container.querySelector('.moon-dynamic');
    if (old) old.remove();
    container.appendChild(moonInfo);

  } catch (error) {
    console.error("Chyba při načítání fáze Měsíce:", error);
  }
}
