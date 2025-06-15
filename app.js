
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const timberPrice = parseFloat(document.getElementById("timber").value);
    const tenderPrice = parseFloat(document.getElementById("tender").value);
    const abidosTimberPrice = parseFloat(document.getElementById("abidosTimber").value);
    const abidosFusionPrice = parseFloat(document.getElementById("abidosFusion").value);

    // Input validation
    if ([timberPrice, tenderPrice, abidosTimberPrice, abidosFusionPrice].some(isNaN)) {
      resultDiv.innerHTML = "<p>Bitte alle Felder korrekt ausfüllen.</p>";
      return;
    }

    // Materialeinsatz für 10 Abidos Fusion
    const timberNeeded = 86;
    const tenderNeeded = 45;
    const abidosTimberNeeded = 33;
    const productionCost = 364;
    const feeRate = 0.05;

    // Rohstoff-Verkaufserlöse (pro Stück aus Preis pro 100)
    const timberUnit = timberPrice / 100;
    const tenderUnit = tenderPrice / 100;
    const abidosTimberUnit = abidosTimberPrice / 100;

    const timberValue = timberNeeded * timberUnit;
    const tenderValue = tenderNeeded * tenderUnit;
    const abidosTimberValue = abidosTimberNeeded * abidosTimberUnit;

    const rawTotalGross = timberValue + tenderValue + abidosTimberValue;
    const rawTotalNet = rawTotalGross * (1 - feeRate);

    // Abidos Fusion Verkaufserlös (10 Stück)
    const fusionGross = abidosFusionPrice * 10;
    const fusionNet = fusionGross * (1 - feeRate);
    const fusionProfit = fusionNet - productionCost;

    // Vergleich
    const profitDiff = fusionProfit - rawTotalNet;
    const betterOption =
      fusionProfit > rawTotalNet ? "Abidos Fusion herstellen" : "Rohstoffe direkt verkaufen";

    resultDiv.innerHTML = `
      <h3>Berechnungsschritte</h3>
      <p><strong>Rohstoffeinsatz:</strong></p>
      <ul>
        <li>86 Timber à ${timberUnit.toFixed(2)} = ${timberValue.toFixed(2)} Gold</li>
        <li>45 Tender Timber à ${tenderUnit.toFixed(2)} = ${tenderValue.toFixed(2)} Gold</li>
        <li>33 Abidos Timber à ${abidosTimberUnit.toFixed(2)} = ${abidosTimberValue.toFixed(2)} Gold</li>
      </ul>
      <p><strong>Gesamterlös beim Rohstoffverkauf (netto):</strong> ${rawTotalNet.toFixed(2)} Gold</p>
      <hr />
      <p><strong>Verkauf von 10 Abidos Fusion à ${abidosFusionPrice}:</strong></p>
      <ul>
        <li>Bruttoeinnahmen: ${fusionGross.toFixed(2)} Gold</li>
        <li>Abzüglich 5% Gebühr: ${fusionNet.toFixed(2)} Gold</li>
        <li>Herstellungskosten: ${productionCost} Gold</li>
        <li><strong>Netto-Gewinn:</strong> ${fusionProfit.toFixed(2)} Gold</li>
      </ul>
      <hr />
      <p><strong>Fazit:</strong> ${betterOption} ist profitabler (Differenz: ${profitDiff.toFixed(2)} Gold)</p>
    `;
  });
});
