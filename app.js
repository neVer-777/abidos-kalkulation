
document.addEventListener("DOMContentLoaded", () => {
  const inputs = ["timberPrice", "tenderPrice", "abidosPrice", "fusionPrice", "availableAmount"];
  inputs.forEach(id => {
    const input = document.getElementById(id);
    const stored = localStorage.getItem(id);
    if (stored) input.value = stored;
    input.addEventListener("focus", () => input.select());
  });

  document.getElementById("calcForm").addEventListener("submit", e => {
    e.preventDefault();
    inputs.forEach(id => localStorage.setItem(id, document.getElementById(id).value));

    const timber = parseFloat(document.getElementById("timberPrice").value) / 100;
    const tender = parseFloat(document.getElementById("tenderPrice").value) / 100;
    const abidos = parseFloat(document.getElementById("abidosPrice").value) / 100;
    const fusion = parseFloat(document.getElementById("fusionPrice").value);
    const amount = parseFloat(document.getElementById("availableAmount").value);

    const matCosts = 86 * timber + 64 * tender + 24 * abidos;
    const craftCost = 364;
    const fusionTotalRevenue = fusion * 10 * 0.95;
    const fusionProfit = fusionTotalRevenue - matCosts - craftCost;

    const rawRevenue = (86 * timber + 64 * tender + 24 * abidos) * 0.95;
    const rawProfit = rawRevenue - (86 * timber + 64 * tender + 24 * abidos);

    const profitFromAvailable = amount * fusion * 0.95;

    document.getElementById("result").innerHTML = `
      <h3>Ergebnisse</h3>
      <p>Materialkosten: ${matCosts.toFixed(2)} Gold</p>
      <p>Herstellungskosten: ${craftCost.toFixed(2)} Gold</p>
      <p>Fusion Erlös nach Gebühren: ${fusionTotalRevenue.toFixed(2)} Gold</p>
      <p><strong>Gewinn Fusion: ${fusionProfit.toFixed(2)} Gold</strong></p>
      <hr />
      <p>Rohstoffverkaufserlös nach Gebühren: ${rawRevenue.toFixed(2)} Gold</p>
      <p><strong>Gewinn Rohstoffe: ${rawProfit.toFixed(2)} Gold</strong></p>
      <hr />
      <p>Gewinn bei Verkauf von ${amount} Abidos Fusion: ${profitFromAvailable.toFixed(2)} Gold</p>
    `;
  });
});
