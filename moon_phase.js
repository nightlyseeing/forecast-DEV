
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

// Výpočet fáze měsíce podle data
function calculateMoonPhase(date = new Date()) {
  const lp = 2551443; // délka lunace v sekundách
  const newMoonRef = new Date(Date.UTC(2001, 0, 1, 0, 0, 0)); // referenční novoluní (UTC)

  const phaseTime = (date.getTime() - newMoonRef.getTime()) / 1000;
  const phase = (phaseTime % lp) / lp;
  const index = Math.floor(phase * 8) % 8;

  return moonPhases[index];
}

// Hlavní funkce pro zobrazení fáze
function fetchMoonPhase(lat, lon) {
  const { name, icon } = calculateMoonPhase();
  const label = document.getElementById("moon-phase-label");

  if (label) {
    label.textContent = `${icon} ${name}`;
  }
}
