
function formatNumber(value) {
  return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

const translations = {
  de: {
    timberLabel: "Timber (pro 100):",
    tenderLabel: "Tender Timber (pro 100):",
    abidosLabel: "Abidos Timber (pro 100):",
    fusionLabel: "Abidos Fusion (pro Stück):",
    compare: "Vergleichen",
    totalProfit: "Gesamtgewinn bei Verkaufsmenge",
    materialsUsed: "Verwendete Materialien",
    directSale: "Direktverkauf der Rohstoffe",
    fusionSale: "Verkauf von Abidos Fusion",
    profitComparison: "Ergebnis:",
    saleTotals: "Verkaufsgewinn (nach Gebühren):"
  },
  en: {
    timberLabel: "Timber (per 100):",
    tenderLabel: "Tender Timber (per 100):",
    abidosLabel: "Abidos Timber (per 100):",
    fusionLabel: "Abidos Fusion (per unit):",
    compare: "Compare",
    totalProfit: "Total Profit for Sales Quantity",
    materialsUsed: "Used Materials",
    directSale: "Direct Sale of Raw Materials",
    fusionSale: "Sale of Abidos Fusion",
    profitComparison: "Result:",
    saleTotals: "Sales Profit (after fees):"
  }
};

const langSelect = document.getElementById("lang");
langSelect.addEventListener("change", () => updateLanguage(langSelect.value));

function updateLanguage(lang) {
  document.querySelectorAll("[data-text]").forEach(el => {
    el.textContent = translations[lang][el.dataset.text];
  });
}

document.getElementById("calc-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const lang = langSelect.value;
  const timber = parseFloat(document.getElementById("timber").value);
  const tender = parseFloat(document.getElementById("tender").value);
  const abidosTimber = parseFloat(document.getElementById("abidosTimber").value);
  const abidosFusion = parseFloat(document.getElementById("abidosFusion").value);

  const timberSell = parseFloat(document.getElementById("verkaufTimber").value);
  const tenderSell = parseFloat(document.getElementById("verkaufTender").value);
  const abidosSell = parseFloat(document.getElementById("verkaufAbidos").value);
  const fusionSell = parseFloat(document.getElementById("verkaufFusion").value);

  const timberNeeded = 86;
  const tenderNeeded = 45;
  const abidosNeeded = 33;
  const herstellungskosten = 364;
  const fusionOutput = 10;

  // Wert der eingesetzten Rohstoffe (normiert)
  const timberValue = (timber / 100) * timberNeeded * 0.95;
  const tenderValue = (tender / 100) * tenderNeeded * 0.95;
  const abidosValue = (abidosTimber / 100) * abidosNeeded * 0.95;
  const rohstoffVerkauf = timberValue + tenderValue + abidosValue;

  const fusionEinnahmen = abidosFusion * fusionOutput * 0.95;
  const fusionGewinn = fusionEinnahmen - herstellungskosten;

  // Einzelverkauf berechnen (mit 5% Gebührenabzug)
  const timberRevenue = (timberSell / 100) * timber * 0.95;
  const tenderRevenue = (tenderSell / 100) * tender * 0.95;
  const abidosRevenue = (abidosSell / 100) * abidosTimber * 0.95;
  const fusionRevenue = fusionSell * abidosFusion * 0.95;

  const totalSaleRevenue = timberRevenue + tenderRevenue + abidosRevenue + fusionRevenue;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h3>${translations[lang].profitComparison}</h3>
    <ul>
      <li><strong>${translations[lang].materialsUsed}:</strong> Timber: 86, Tender Timber: 45, Abidos Timber: 33</li>
      <li><strong>${translations[lang].directSale}:</strong> ${formatNumber(rohstoffVerkauf)} Gold</li>
      <li><strong>${translations[lang].fusionSale}:</strong> ${formatNumber(fusionEinnahmen)} Gold (− ${herstellungskosten} = ${formatNumber(fusionGewinn)} Gold)</li>
      <li><strong>${translations[lang].saleTotals}:</strong> ${formatNumber(totalSaleRevenue)} Gold</li>
    </ul>
    <h4>${fusionGewinn > rohstoffVerkauf ? "✅ Abidos Fusion Verkauf ist lukrativer" : "❌ Rohstoffverkauf ist lukrativer"}</h4>
  `;
});
