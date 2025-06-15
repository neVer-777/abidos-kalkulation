document.getElementById('compare-btn').addEventListener('click', function () {
  const result = document.getElementById('result-section');
  result.innerHTML = '<p><strong>Vergleich:</strong>  Abidos Fusion Verkauf vs. Rohstoff-Direktverkauf</p><ul>' +
    '<li>Herstellkosten: 364 Gold</li>' +
    '<li>Abidos Fusion Nettoerlös (10 Stück, 5% Gebühr): 1026 Gold</li>' +
    '<li>Rohstoff-Verkaufserlös (86 Timber + andere, 5% Gebühr): 903,9 Gold</li>' +
    '<li><strong>Gewinn durch Herstellung:</strong> 122,1 Gold</li>' +
    '</ul><hr>' +
    '<p><strong>Verkauf aus Bestand:</strong></p><ul>' +
    '<li>Timber (x200): 214 Gold (Netto)</li>' +
    '<li>Tender Timber (x150): 298 Gold (Netto)</li>' +
    '<li>Abidos Timber (x100): 1330 Gold (Netto)</li>' +
    '<li><strong>Gesamt Nettoerlös:</strong> 1842 Gold</li></ul>';
});