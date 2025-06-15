
function parseInput(value) {
  return parseFloat(value.replace(",", ".").replace(/\./g, ""));
}

function formatGold(value) {
  return value.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculateComparison() {
  const fusionPrice = parseInput(document.getElementById("fusion-price").value) || 0;
  const timberPrice = parseInput(document.getElementById("timber-price").value) || 0;
  const tenderPrice = parseInput(document.getElementById("tender-price").value) || 0;
  const abidosPrice = parseInput(document.getElementById("abidos-price").value) || 0;
  const productionCost = parseInput(document.getElementById("production-cost").value) || 0;

  // Fixe Mengen laut Angabe
  const timberQty = 86;
  const tenderQty = 45;
  const abidosQty = 41;
  const fusionQty = 10;

  const feeRate = 0.05;

  const grossFusion = fusionPrice * fusionQty;
  const feeFusion = grossFusion * feeRate;
  const netFusion = grossFusion - feeFusion - productionCost;

  const timberUnit = timberPrice / 100;
  const tenderUnit = tenderPrice / 100;
  const abidosUnit = abidosPrice / 100;

  const grossTimber = timberUnit * timberQty;
  const grossTender = tenderUnit * tenderQty;
  const grossAbidos = abidosUnit * abidosQty;

  const totalRawGross = grossTimber + grossTender + grossAbidos;
  const totalRawFee = totalRawGross * feeRate;
  const netRaw = totalRawGross - totalRawFee;

  const diff = netFusion - netRaw;

  document.getElementById("vergleich-ergebnis").innerHTML = `
    <strong>📊 Ergebnis:</strong><br>
    <u>Nettoerlös bei Verkauf von 10 Abidos Fusion:</u> <strong>${formatGold(netFusion)} Gold</strong><br>
    <u>Nettoerlös beim Verkauf der Rohstoffe:</u> <strong>${formatGold(netRaw)} Gold</strong><br>
    <u>Differenz:</u> <strong style="color:${diff >= 0 ? 'green' : 'red'}">${formatGold(diff)} Gold</strong><br><br>

    <details>
      <summary>🔍 Berechnungsschritte anzeigen</summary>
      <ul>
        <li>Fusion: ${fusionPrice} × 10 = ${formatGold(grossFusion)} – 5% = ${formatGold(grossFusion - feeFusion)}</li>
        <li>− Herstellungskosten: ${formatGold(productionCost)} → Netto: ${formatGold(netFusion)}</li>
        <li>Timber (86): ${formatGold(timberUnit)} × 86 = ${formatGold(grossTimber)}</li>
        <li>Tender (45): ${formatGold(tenderUnit)} × 45 = ${formatGold(grossTender)}</li>
        <li>Abidos (41): ${formatGold(abidosUnit)} × 41 = ${formatGold(grossAbidos)}</li>
        <li>Rohstoffverkauf: Gesamt = ${formatGold(totalRawGross)} – 5% = ${formatGold(netRaw)}</li>
      </ul>
    </details>
  `;
}

function calculateStock() {
  const items = [
    { id: 'timber', unitDiv: 100 },
    { id: 'tender', unitDiv: 100 },
    { id: 'abidos', unitDiv: 100 },
    { id: 'fusion', unitDiv: 1 },
  ];

  let totalNet = 0;
  let rows = '';

  items.forEach(item => {
    const price = parseInput(document.getElementById(`stock-${item.id}-price`).value) || 0;
    const qty = parseInput(document.getElementById(`stock-${item.id}-qty`).value) || 0;

    if (qty > 0 && price > 0) {
      const unitPrice = price / item.unitDiv;
      const gross = qty * unitPrice;
      const fee = gross * 0.05;
      const net = gross - fee;
      totalNet += net;

      rows += `<li>${item.id.charAt(0).toUpperCase() + item.id.slice(1)}: ${qty} × ${formatGold(unitPrice)} = ${formatGold(gross)} – 5% = <strong>${formatGold(net)}</strong></li>`;
    }
  });

  document.getElementById("verkaufs-ergebnis").innerHTML = `
    <strong>💰 Gesamt-Nettoerlös: ${formatGold(totalNet)} Gold</strong>
    <details><summary>Details anzeigen</summary><ul>${rows}</ul></details>
  `;
}

const translations = {
  de: {
    title: "Abidos Fusion Kalkulation",
    compare: "Vergleich: Fusion vs. Rohstoffverkauf",
    stock: "Verkaufsrechnung deines Bestands",
    calculate: "Berechnen",
    calculateStock: "Bestandswert berechnen"
  },
  en: {
    title: "Abidos Fusion Calculator",
    compare: "Compare: Fusion vs. Selling Materials",
    stock: "Sell Value of Your Inventory",
    calculate: "Calculate",
    calculateStock: "Calculate Inventory Value"
  }
};

function switchLanguage() {
  const lang = document.getElementById("lang").value;
  localStorage.setItem("lang", lang);
  document.querySelector("h1").innerText = translations[lang].title;
  document.querySelectorAll("h2")[0].innerText = "📌 " + translations[lang].compare;
  document.querySelectorAll("h2")[1].innerText = "📦 " + translations[lang].stock;
  document.querySelectorAll("button")[0].innerText = translations[lang].calculate;
  document.querySelectorAll("button")[1].innerText = translations[lang].calculateStock;
}

function saveInputs() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
    localStorage.setItem(input.id, input.value);
  });
}

function loadInputs() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
    const saved = localStorage.getItem(input.id);
    if (saved !== null) input.value = saved;
    input.addEventListener("focus", () => input.select());
    input.addEventListener("input", saveInputs);
  });

  const lang = localStorage.getItem("lang") || "de";
  document.getElementById("lang").value = lang;
  switchLanguage();
}

window.onload = loadInputs;
