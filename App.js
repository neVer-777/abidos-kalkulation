
import React, { useState } from 'react';
import './App.css';

function App() {
  const [timber, setTimber] = useState(0);
  const [tenderTimber, setTenderTimber] = useState(0);
  const [abidosTimber, setAbidosTimber] = useState(0);
  const [fusionPrice, setFusionPrice] = useState(0);

  const productionCost = 364;
  const feeRate = 0.05;
  const materialsPerCharge = {
    timber: 86,
    tender: 45,
    abidos: 33
  };

  const fusionPerCharge = 10;

  const calculate = () => {
    const timberPerPiece = (timber / 100) * materialsPerCharge.timber / fusionPerCharge;
    const tenderPerPiece = (tenderTimber / 100) * materialsPerCharge.tender / fusionPerCharge;
    const abidosPerPiece = (abidosTimber / 100) * materialsPerCharge.abidos / fusionPerCharge;
    const totalMaterial = timberPerPiece + tenderPerPiece + abidosPerPiece;
    const totalCost = totalMaterial + (productionCost / fusionPerCharge);
    const netRevenue = fusionPrice * (1 - feeRate);
    const profit = netRevenue - totalCost;

    return {
      cost: totalCost.toFixed(2),
      net: netRevenue.toFixed(2),
      profit: profit.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Abidos Kalkulation</h1>
      <label>Timber (100 Stück): <input type="number" value={timber} onChange={e => setTimber(Number(e.target.value))} /></label><br />
      <label>Tender Timber (100 Stück): <input type="number" value={tenderTimber} onChange={e => setTenderTimber(Number(e.target.value))} /></label><br />
      <label>Abidos Timber (100 Stück): <input type="number" value={abidosTimber} onChange={e => setAbidosTimber(Number(e.target.value))} /></label><br />
      <label>Abidos Fusion Preis (pro Stück): <input type="number" value={fusionPrice} onChange={e => setFusionPrice(Number(e.target.value))} /></label><br /><br />
      <div>
        <strong>Herstellungskosten / Stück:</strong> {result.cost} Gold<br />
        <strong>Nettoerlös / Stück:</strong> {result.net} Gold<br />
        <strong>Gewinn / Stück:</strong> {result.profit} Gold
      </div>
    </div>
  );
}

export default App;
