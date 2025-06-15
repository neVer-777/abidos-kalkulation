
document.getElementById('calc-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const timber = parseFloat(document.getElementById('timber').value);
  const tender = parseFloat(document.getElementById('tender').value);
  const abidos = parseFloat(document.getElementById('abidos').value);
  const fusion = parseFloat(document.getElementById('fusion').value);

  const timber_stk = timber / 100;
  const tender_stk = tender / 100;
  const abidos_stk = abidos / 100;

  const rohstoffwert = (86 * timber_stk + 45 * tender_stk + 33 * abidos_stk);
  const gewinn_rohstoffe = rohstoffwert * 0.95;

  const erl_fusion = (fusion * 10) * 0.95;
  const gewinn_fusion = erl_fusion - 364;

  const lukrativer = gewinn_fusion > gewinn_rohstoffe ? "Abidos Fusion" : "Rohstoffe";

  document.getElementById('result').innerHTML = `
    <p><strong>Gewinn Rohstoffe:</strong> ${gewinn_rohstoffe.toFixed(2)} Gold</p>
    <p><strong>Gewinn Abidos Fusion:</strong> ${gewinn_fusion.toFixed(2)} Gold</p>
    <p><strong>Lukrativer:</strong> ${lukrativer}</p>
  `;
});
