
// Funktionen für Währungsformatierung
const formatNumber = (num) => {
    return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const parseInput = (value) => parseFloat(value.replace(',', '.')) || 0;

// Berechnung starten
function calculate() {
    const timberPricePer100 = parseInput(document.getElementById('timberPrice').value);
    const tenderTimberPricePer100 = parseInput(document.getElementById('tenderTimberPrice').value);
    const abidosTimberPricePer100 = parseInput(document.getElementById('abidosTimberPrice').value);
    const abidosFusionPrice = parseInput(document.getElementById('abidosFusionPrice').value);

    const timberQty = parseInput(document.getElementById('timberQty').value);
    const tenderTimberQty = parseInput(document.getElementById('tenderTimberQty').value);
    const abidosTimberQty = parseInput(document.getElementById('abidosTimberQty').value);
    const abidosFusionQty = parseInput(document.getElementById('abidosFusionQty').value);

    const feeRate = 0.05;
    const craftingCost = 364;
    const timberPerCharge = 100;

    const timberUnitPrice = timberPricePer100 / timberPerCharge;
    const tenderTimberUnitPrice = tenderTimberPricePer100 / timberPerCharge;
    const abidosTimberUnitPrice = abidosTimberPricePer100 / timberPerCharge;

    const timberNeeded = 86;
    const tenderTimberNeeded = 45;
    const abidosTimberNeeded = 33;
    const abidosFusionOutput = 10;

    const abidosFusionNetUnitPrice = abidosFusionPrice * (1 - feeRate);
    const abidosFusionTotalRevenue = abidosFusionNetUnitPrice * abidosFusionOutput;
    const abidosFusionTotalProfit = abidosFusionTotalRevenue - craftingCost;

    const timberSellValue = timberNeeded * timberUnitPrice * (1 - feeRate);
    const tenderTimberSellValue = tenderTimberNeeded * tenderTimberUnitPrice * (1 - feeRate);
    const abidosTimberSellValue = abidosTimberNeeded * abidosTimberUnitPrice * (1 - feeRate);
    const totalRawSellProfit = timberSellValue + tenderTimberSellValue + abidosTimberSellValue;

    const result = `
    <h3>📊 Vergleich: Herstellung vs. Direktverkauf</h3>
    <ul>
        <li><strong>Abidos Fusion:</strong> ${abidosFusionOutput} Stück × ${formatNumber(abidosFusionNetUnitPrice)} = ${formatNumber(abidosFusionTotalRevenue)} Gold</li>
        <li><strong>Herstellungskosten:</strong> ${formatNumber(craftingCost)} Gold</li>
        <li><strong>Gewinn:</strong> ${formatNumber(abidosFusionTotalProfit)} Gold</li>
    </ul>
    <ul>
        <li><strong>Timber:</strong> ${timberNeeded} × ${formatNumber(timberUnitPrice)} × 95% = ${formatNumber(timberSellValue)} Gold</li>
        <li><strong>Tender Timber:</strong> ${tenderTimberNeeded} × ${formatNumber(tenderTimberUnitPrice)} × 95% = ${formatNumber(tenderTimberSellValue)} Gold</li>
        <li><strong>Abidos Timber:</strong> ${abidosTimberNeeded} × ${formatNumber(abidosTimberUnitPrice)} × 95% = ${formatNumber(abidosTimberSellValue)} Gold</li>
        <li><strong>Gesamterlös Rohstoffe:</strong> ${formatNumber(totalRawSellProfit)} Gold</li>
    </ul>
    <p><strong>📈 Ergebnis:</strong> ${
        abidosFusionTotalProfit > totalRawSellProfit
            ? 'Herstellung ist lukrativer.'
            : 'Direktverkauf ist lukrativer.'
    }</p>

    <h3>📦 Verkaufswert deines Bestands</h3>
    <ul>
        <li><strong>Timber:</strong> ${timberQty} × ${formatNumber(timberUnitPrice)} × 95% = ${formatNumber(timberQty * timberUnitPrice * (1 - feeRate))} Gold</li>
        <li><strong>Tender Timber:</strong> ${tenderTimberQty} × ${formatNumber(tenderTimberUnitPrice)} × 95% = ${formatNumber(tenderTimberQty * tenderTimberUnitPrice * (1 - feeRate))} Gold</li>
        <li><strong>Abidos Timber:</strong> ${abidosTimberQty} × ${formatNumber(abidosTimberUnitPrice)} × 95% = ${formatNumber(abidosTimberQty * abidosTimberUnitPrice * (1 - feeRate))} Gold</li>
        <li><strong>Abidos Fusion:</strong> ${abidosFusionQty} × ${formatNumber(abidosFusionNetUnitPrice)} = ${formatNumber(abidosFusionQty * abidosFusionNetUnitPrice)} Gold</li>
    </ul>
    `;

    document.getElementById('results').innerHTML = result;
}
