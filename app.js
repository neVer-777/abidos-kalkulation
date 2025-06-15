
function setLanguage(lang) {
  document.querySelectorAll(".lang").forEach(el => {
    el.textContent = el.getAttribute(`data-lang-${lang}`);
  });
}

function formatNumber(num) {
  return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getInputValue(id) {
  return parseFloat(document.getElementById(id).value.replace(",", ".")) || 0;
}

function calculate() {
  const timberPrice = getInputValue("timberPrice") / 100;
  const tenderPrice = getInputValue("tenderPrice") / 100;
  const abidosPrice = getInputValue("abidosPrice") / 100;
  const fusionPrice = getInputValue("fusionPrice");

  const timberStock = getInputValue("timberStock");
  const tenderStock = getInputValue("tenderStock");
  const abidosStock = getInputValue("abidosStock");
  const fusionStock = getInputValue("fusionStock");

  // Vergleichsrechnung
  const timberNeed = 86;
  const tenderNeed = 45;
  const abidosNeed = 33;
  const goldCost = 364;
  const fusionQty = 10;
  const sellFee = 0.05;

  const materialCost = (timberNeed * timberPrice) + (tenderNeed * tenderPrice) + (abidosNeed * abidosPrice);
  const totalProductionCost = materialCost + goldCost;
  const revenueFusion = (fusionPrice * fusionQty) * (1 - sellFee);
  const profitFusion = revenueFusion - totalProductionCost;

  const revenueRawMaterials = (
    (timberNeed * timberPrice) +
    (tenderNeed * tenderPrice) +
    (abidosNeed * abidosPrice)
  ) * (1 - sellFee);
  const profitDifference = profitFusion - revenueRawMaterials;

  // Verkaufsgewinn aus Bestand
  const timberRevenue = timberStock * timberPrice * (1 - sellFee);
  const tenderRevenue = tenderStock * tenderPrice * (1 - sellFee);
  const abidosRevenue = abidosStock * abidosPrice * (1 - sellFee);
  const fusionRevenue = fusionStock * fusionPrice * (1 - sellFee);

  const totalStockRevenue = timberRevenue + tenderRevenue + abidosRevenue + fusionRevenue;

  document.getElementById("results").innerHTML = `
    <h3>Vergleichsrechnung</h3>
    <p>Kosten für Rohstoffe pro Charge Abidos Fusion (10 Stück):</p>
    <ul>
      <li>86 Timber × ${formatNumber(timberPrice)} = ${formatNumber(timberNeed * timberPrice)}</li>
      <li>45 Tender Timber × ${formatNumber(tenderPrice)} = ${formatNumber(tenderNeed * tenderPrice)}</li>
      <li>33 Abidos Timber × ${formatNumber(abidosPrice)} = ${formatNumber(abidosNeed * abidosPrice)}</li>
      <li>+ Herstellungskosten: ${formatNumber(goldCost)}</li>
    </ul>
    <p>Gesamtkosten: ${formatNumber(totalProductionCost)}</p>
    <p>Verkaufserlös Abidos Fusion (10 Stück) abzüglich 5% Gebühren: ${formatNumber(revenueFusion)}</p>
    <p><strong>Gewinn durch Verkauf Abidos Fusion: ${formatNumber(profitFusion)}</strong></p>
    <p>Wären die Rohstoffe direkt verkauft worden:<br />
    Nettoerlös Rohstoffe (nach 5% Gebühren): ${formatNumber(revenueRawMaterials)}</p>
    <p><strong>Abidos Fusion ist ${profitDifference >= 0 ? 'lukrativer' : 'weniger lukrativ'} um ${formatNumber(Math.abs(profitDifference))} Gold</strong></p>

    <h3>Verkaufsgewinn aus Bestand</h3>
    <ul>
      <li>Timber: ${timberStock} × ${formatNumber(timberPrice)} = ${formatNumber(timberRevenue)}</li>
      <li>Tender Timber: ${tenderStock} × ${formatNumber(tenderPrice)} = ${formatNumber(tenderRevenue)}</li>
      <li>Abidos Timber: ${abidosStock} × ${formatNumber(abidosPrice)} = ${formatNumber(abidosRevenue)}</li>
      <li>Abidos Fusion: ${fusionStock} × ${formatNumber(fusionPrice)} = ${formatNumber(fusionRevenue)}</li>
    </ul>
    <p><strong>Gesamterlös bei Verkauf des Bestands (abzgl. Gebühren): ${formatNumber(totalStockRevenue)}</strong></p>
  `;
}
