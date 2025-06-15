
document.getElementById("calc-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const timberPrice = parseFloat(document.getElementById("timberPrice").value.replace(",", "."));
    const tenderPrice = parseFloat(document.getElementById("tenderTimberPrice").value.replace(",", "."));
    const abidosPrice = parseFloat(document.getElementById("abidosTimberPrice").value.replace(",", "."));
    const fusionPrice = parseFloat(document.getElementById("abidosFusionPrice").value.replace(",", "."));

    const haveTimber = parseInt(document.getElementById("haveTimber").value);
    const haveTender = parseInt(document.getElementById("haveTender").value);
    const haveAbidos = parseInt(document.getElementById("haveAbidos").value);
    const haveFusion = parseInt(document.getElementById("haveFusion").value);

    const timberUnitPrice = timberPrice / 100;
    const tenderUnitPrice = tenderPrice / 100;
    const abidosUnitPrice = abidosPrice / 100;

    const timberNeed = 86;
    const tenderNeed = 23;
    const abidosNeed = 9;
    const herstellungKosten = 364;

    // Vergleich: was wäre der Nettoverkaufswert der Rohstoffe (abzüglich 5% Gebühr)?
    const rohstoffVerkauf = (timberNeed * timberUnitPrice + tenderNeed * tenderUnitPrice + abidosNeed * abidosUnitPrice) * 0.95;

    // Abidos Fusion Nettoverkaufswert (10 Stück)
    const fusionNetto = (10 * fusionPrice) * 0.95;

    // Vergleichsergebnis
    const istFusionBesser = fusionNetto > rohstoffVerkauf;
    const vorteil = (fusionNetto - rohstoffVerkauf).toFixed(2);

    // Bestand verkaufen
    const bestandVerkauf = (haveTimber * timberUnitPrice + haveTender * tenderUnitPrice + haveAbidos * abidosUnitPrice + haveFusion * fusionPrice) * 0.95;

    const results = `
    <h3>Berechnungsschritte</h3>
    <ul>
        <li>1 Timber kostet: ${timberUnitPrice.toFixed(2)} Gold</li>
        <li>1 Tender Timber kostet: ${tenderUnitPrice.toFixed(2)} Gold</li>
        <li>1 Abidos Timber kostet: ${abidosUnitPrice.toFixed(2)} Gold</li>
        <li>Benötigt: 86 Timber, 23 Tender Timber, 9 Abidos Timber</li>
        <li>Nettoerlös Rohstoffverkauf (gesamt): ${rohstoffVerkauf.toLocaleString("de-DE", { minimumFractionDigits: 2 })} Gold</li>
        <li>Nettoerlös Abidos Fusion Verkauf: ${fusionNetto.toLocaleString("de-DE", { minimumFractionDigits: 2 })} Gold</li>
        <li>Ergebnis: ${istFusionBesser ? "Herstellung ist lukrativer" : "Direkter Verkauf ist lukrativer"} (${Math.abs(vorteil)} Gold Differenz)</li>
    </ul>
    <h3>Gewinn bei Verkauf des Bestands</h3>
    <p>Gesamterlös abzüglich 5% Gebühr: <strong>${bestandVerkauf.toLocaleString("de-DE", { minimumFractionDigits: 2 })} Gold</strong></p>
    `;

    document.getElementById("results").innerHTML = results;
});
