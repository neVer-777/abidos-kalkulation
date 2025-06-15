
function formatNumber(num) {
    return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculate() {
    const timberPricePer100 = parseFloat(document.getElementById("timber-price").value.replace(',', '.'));
    const tenderTimberPricePer100 = parseFloat(document.getElementById("tender-price").value.replace(',', '.'));
    const abidosTimberPricePer100 = parseFloat(document.getElementById("abidos-price").value.replace(',', '.'));
    const fusionPricePerUnit = parseFloat(document.getElementById("fusion-price").value.replace(',', '.'));
    const timberHave = parseInt(document.getElementById("timber-have").value);
    const tenderHave = parseInt(document.getElementById("tender-have").value);
    const abidosHave = parseInt(document.getElementById("abidos-have").value);
    const fusionHave = parseInt(document.getElementById("fusion-have").value);

    const timberUnit = timberPricePer100 / 100;
    const tenderUnit = tenderTimberPricePer100 / 100;
    const abidosUnit = abidosTimberPricePer100 / 100;
    const productionCost = 364;
    const chargeSize = 10;

    const neededTimber = 86;
    const neededTender = 45;
    const neededAbidos = 33;

    const fusionNet = fusionPricePerUnit * 0.95;
    const totalFusionRevenue = fusionNet * chargeSize;
    const totalProductionCost = productionCost;

    const totalRohRevenue = (
        (neededTimber * timberUnit) +
        (neededTender * tenderUnit) +
        (neededAbidos * abidosUnit)
    ) * 0.95;

    const resultText = `
        <h3>1. Vergleich: Herstellung vs. direkter Verkauf</h3>
        <p>➤ 10 Abidos Fusion Verkaufserlös brutto: ${formatNumber(fusionPricePerUnit * chargeSize)} Gold</p>
        <p>➤ 10 Abidos Fusion Verkaufserlös netto (abzgl. 5%): <strong>${formatNumber(totalFusionRevenue)} Gold</strong></p>
        <p>➤ Herstellkosten für 10 Abidos Fusion: <strong>${formatNumber(totalProductionCost)} Gold</strong></p>
        <p>➤ Gewinn: <strong>${formatNumber(totalFusionRevenue - totalProductionCost)} Gold</strong></p>
        <br>
        <p>➤ Direktverkauf Rohstoffe netto (Anteil für 10 Fusion): <strong>${formatNumber(totalRohRevenue)} Gold</strong></p>
        <p><strong>➤ Ergebnis: ${
            (totalFusionRevenue - totalProductionCost) > totalRohRevenue
            ? 'Herstellung & Verkauf der Abidos Fusion ist lukrativer.'
            : 'Direktverkauf der Rohstoffe ist lukrativer.'
        }</strong></p>
        <hr>
    `;

    const timberBrutto = (timberHave / 100) * timberPricePer100;
    const timberNetto = timberBrutto * 0.95;
    const tenderBrutto = (tenderHave / 100) * tenderTimberPricePer100;
    const tenderNetto = tenderBrutto * 0.95;
    const abidosBrutto = (abidosHave / 100) * abidosTimberPricePer100;
    const abidosNetto = abidosBrutto * 0.95;
    const fusionBrutto = fusionHave * fusionPricePerUnit;
    const fusionNetto = fusionBrutto * 0.95;

    const bestandText = `
        <h3>2. Bestandverkaufsanalyse</h3>
        <p>➤ Timber (${timberHave}): Brutto ${formatNumber(timberBrutto)} – Netto <strong>${formatNumber(timberNetto)}</strong></p>
        <p>➤ Tender Timber (${tenderHave}): Brutto ${formatNumber(tenderBrutto)} – Netto <strong>${formatNumber(tenderNetto)}</strong></p>
        <p>➤ Abidos Timber (${abidosHave}): Brutto ${formatNumber(abidosBrutto)} – Netto <strong>${formatNumber(abidosNetto)}</strong></p>
        <p>➤ Abidos Fusion (${fusionHave}): Brutto ${formatNumber(fusionBrutto)} – Netto <strong>${formatNumber(fusionNetto)}</strong></p>
        <br>
        <p><strong>➤ Gesamterlös (netto) bei Verkauf des Bestands: ${formatNumber(timberNetto + tenderNetto + abidosNetto + fusionNetto)} Gold</strong></p>
    `;

    document.getElementById("results").innerHTML = resultText + bestandText;
}
