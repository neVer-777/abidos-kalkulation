
document.getElementById("calcForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const format = num => num.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const priceTimber = parseFloat(document.getElementById("priceTimber").value) / 100;
  const priceTenderTimber = parseFloat(document.getElementById("priceTenderTimber").value) / 100;
  const priceAbidosTimber = parseFloat(document.getElementById("priceAbidosTimber").value) / 100;
  const priceFusion = parseFloat(document.getElementById("priceFusion").value);

  const timberPerCharge = 86;
  const tenderPerCharge = 45;
  const abidosPerCharge = 33;
  const productionCost = 364;
  const fusionPerCharge = 10;

  // Vergleichsrechnung (Herstellung vs Verkauf der Rohstoffe)
  const revenueFusionGross = fusionPerCharge * priceFusion;
  const revenueFusionNet = revenueFusionGross * 0.95;
  const netProfitFromFusion = revenueFusionNet - productionCost;

  const rawSaleNet =
    (timberPerCharge * priceTimber + tenderPerCharge * priceTenderTimber + abidosPerCharge * priceAbidosTimber) * 0.95;

  const moreProfitable = revenueFusionNet > rawSaleNet ? "Herstellung von Abidos Fusion ist lukrativer." : "Direktverkauf der Rohstoffe ist lukrativer.";

  // Verkauf aus Bestand
  const qtyTimber = parseFloat(document.getElementById("amountTimber").value);
  const qtyTender = parseFloat(document.getElementById("amountTenderTimber").value);
  const qtyAbidos = parseFloat(document.getElementById("amountAbidosTimber").value);
  const qtyFusion = parseFloat(document.getElementById("amountFusion").value);

  const totalTimber = qtyTimber * priceTimber;
  const totalTender = qtyTender * priceTenderTimber;
  const totalAbidos = qtyAbidos * priceAbidosTimber;
  const totalFusion = qtyFusion * priceFusion;

  const totalNet =
    (totalTimber + totalTender + totalAbidos + totalFusion) * 0.95;

  // Ausgabe
  document.getElementById("results").innerHTML = `
    <h2>Vergleich</h2>
    <p>Verkauf von 10 Abidos Fusion (netto): ${format(revenueFusionNet)} Gold</p>
    <p>Herstellungskosten (nur Gold, Rohstoffe ignoriert): ${format(productionCost)} Gold</p>
    <p>Netto-Gewinn durch Herstellung & Verkauf: ${format(netProfitFromFusion)} Gold</p>
    <p>Verkauf der eingesetzten Rohstoffe (netto): ${format(rawSaleNet)} Gold</p>
    <strong>${moreProfitable}</strong>

    <h2>Bestandsverkauf</h2>
    <p>Timber: ${qtyTimber} → Netto: ${format(qtyTimber * priceTimber * 0.95)} Gold</p>
    <p>Tender Timber: ${qtyTender} → Netto: ${format(qtyTender * priceTenderTimber * 0.95)} Gold</p>
    <p>Abidos Timber: ${qtyAbidos} → Netto: ${format(qtyAbidos * priceAbidosTimber * 0.95)} Gold</p>
    <p>Abidos Fusion: ${qtyFusion} → Netto: ${format(qtyFusion * priceFusion * 0.95)} Gold</p>
    <strong>Gesamterlös (netto): ${format(totalNet)} Gold</strong>
  `;
});
