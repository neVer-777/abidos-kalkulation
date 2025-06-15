
function parseInput(str) {
  return parseFloat(str.replace('.', '').replace(',', '.'));
}
function formatGold(num) {
  return (Math.round(num).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " Gold";
}
function calculateComparison() {
  const fusionPrice = parseInput(document.getElementById("fusion-price").value);
  const cost = parseInput(document.getElementById("manufacturing-cost").value);
  const saleGross = fusionPrice * 10;
  const saleNet = saleGross * 0.95;
  const resourceValue =
    (86 * 107 / 100 + 45 * 209 / 100 + 41 * 1400 / 100) * 0.95;
  const resultDiff = saleNet - cost - resourceValue;
  document.getElementById("vergleich-ergebnis").innerHTML =
    `<p>Fusion Nettoverkauf (10×): ${formatGold(saleNet)}</p>
     <p>Rohstoffverkaufswert: ${formatGold(resourceValue)}</p>
     <p>Herstellungskosten: ${formatGold(cost)}</p>
     <p><strong>➤ Ergebnis: ${formatGold(resultDiff)}</strong></p>`;
}
function calculateStock() {
  const items = [
    { label: "Timber", priceId: "stock-timber-price", qtyId: "stock-timber-qty", per100: true },
    { label: "Tender Timber", priceId: "stock-tender-price", qtyId: "stock-tender-qty", per100: true },
    { label: "Abidos Timber", priceId: "stock-abidos-price", qtyId: "stock-abidos-qty", per100: true },
    { label: "Abidos Fusion", priceId: "stock-fusion-price", qtyId: "stock-fusion-qty", per100: false }
  ];
  let totalNet = 0;
  let html = "<ul>";
  items.forEach(item => {
    const price = parseInput(document.getElementById(item.priceId).value) || 0;
    const qty = parseInput(document.getElementById(item.qtyId).value) || 0;
    if (price > 0 && qty > 0) {
      const unit = item.per100 ? price / 100 : price;
      const gross = qty * unit;
      const net = gross * 0.95;
      totalNet += net;
      html += `<li>${item.label}: ${qty} × ${formatGold(unit)} = ${formatGold(gross)}, netto = <strong>${formatGold(net)}</strong></li>`;
    }
  });
  html += "</ul><p>💰 <strong>Gesamt-Nettoerlös:</strong> " + formatGold(totalNet) + "</p>";
  document.getElementById("verkaufs-ergebnis").innerHTML = html;
}
