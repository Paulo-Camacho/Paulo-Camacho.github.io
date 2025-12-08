document.getElementById("pvForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fv = Number(document.getElementById("pv_fv").value);
  const n = Number(document.getElementById("pv_n").value);
  const ratePct = Number(document.getElementById("pv_rate").value);

  const r = ratePct / 100; // convert percent to decimal

  const pv = fv / Math.pow(1 + r, n);

  document.getElementById("pvResult").textContent =
    "Present Value: $" + pv.toFixed(2);
});
