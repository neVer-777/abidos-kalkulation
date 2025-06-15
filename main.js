
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
