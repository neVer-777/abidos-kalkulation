
function kalkuliere() {
  const timber100 = parseFloat(document.getElementById('timber').value);
  const tender100 = parseFloat(document.getElementById('tender').value);
  const abidos100 = parseFloat(document.getElementById('abidos').value);
  const fusionStk = parseFloat(document.getElementById('fusion').value);

  const timberStk = (timber100 * 0.95) / 100;
  const tenderStk = (tender100 * 0.95) / 100;
  const abidosStk = (abidos100 * 0.95) / 100;

  const rohgewinn = timberStk * 86 + tenderStk * 45 + abidosStk * 33;
  const fusionErlös = (fusionStk * 10) * 0.95;
  const fusionGewinn = fusionErlös - 364;

  const lukrativ = fusionGewinn > rohgewinn ? "Abidos Fusion" : "Rohstoffverkauf";

  const text = \`
🔹 Rohstoffverkauf: \${rohgewinn.toFixed(2)} G
🔹 Fusionverkauf:   \${fusionErlös.toFixed(2)} G
🔹 Gewinn Fusion:   \${fusionGewinn.toFixed(2)} G
🏆 Lukrativer: \${lukrativ}
\`;

  document.getElementById('ergebnis').innerText = text;
}
