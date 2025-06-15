
function calculate() {
    const tp = parseFloat(document.getElementById("timberPrice").value.replace(',', '.'));
    const ttp = parseFloat(document.getElementById("tenderPrice").value.replace(',', '.'));
    const atp = parseFloat(document.getElementById("abidosTimberPrice").value.replace(',', '.'));
    const afp = parseFloat(document.getElementById("fusionPrice").value.replace(',', '.'));

    const haveTimber = parseInt(document.getElementById("haveTimber").value);
    const haveTender = parseInt(document.getElementById("haveTender").value);
    const haveAbidosTimber = parseInt(document.getElementById("haveAbidosTimber").value);
    const haveFusion = parseInt(document.getElementById("haveFusion").value);

    const timberPerUnit = tp / 100;
    const tenderPerUnit = ttp / 100;
    const abidosPerUnit = atp / 100;

    const fusionCount = Math.floor(Math.min(haveTimber / 8.6, haveTender / 2.5, haveAbidosTimber / 1.6));
    const fusionGoldGross = fusionCount * afp;
    const fusionGoldNet = fusionGoldGross * 0.95;

    const sellTimber = haveTimber / 100 * tp * 0.95;
    const sellTender = haveTender / 100 * ttp * 0.95;
    const sellAbidosTimber = haveAbidosTimber / 100 * atp * 0.95;
    const sellFusion = haveFusion * afp * 0.95;

    const totalDirectSell = sellTimber + sellTender + sellAbidosTimber + sellFusion;

    const output = `
    <h3>Vergleichsrechnung (je 10 Abidos Fusion)</h3>
    <p>Benötigt: 86 Timber à ${timberPerUnit.toFixed(2).replace('.', ',')} G = ${(86 * timberPerUnit).toFixed(2).replace('.', ',')} G<br>
    25 Tender Timber à ${tenderPerUnit.toFixed(2).replace('.', ',')} G = ${(25 * tenderPerUnit).toFixed(2).replace('.', ',')} G<br>
    16 Abidos Timber à ${abidosPerUnit.toFixed(2).replace('.', ',')} G = ${(16 * abidosPerUnit).toFixed(2).replace('.', ',')} G<br>
    Herstellungskosten: 364 G</p>
    <p>Verkauf 10 Abidos Fusion brutto: ${(10 * afp).toFixed(2).replace('.', ',')} G<br>
    Netto: ${(10 * afp * 0.95).toFixed(2).replace('.', ',')} G</p>

    <h3>Direktverkauf Bestand</h3>
    <p>Timber: ${sellTimber.toFixed(2).replace('.', ',')} G<br>
    Tender Timber: ${sellTender.toFixed(2).replace('.', ',')} G<br>
    Abidos Timber: ${sellAbidosTimber.toFixed(2).replace('.', ',')} G<br>
    Abidos Fusion: ${sellFusion.toFixed(2).replace('.', ',')} G</p>
    <p><strong>Gesamt Nettoerlös: ${totalDirectSell.toFixed(2).replace('.', ',')} G</strong></p>
    `;

    document.getElementById("output").innerHTML = output;
}
