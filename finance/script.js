document.getElementById("fvForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pv   = Number(document.getElementById("pv").value);
  const ratePct = Number(document.getElementById("rate").value); // shown as %
  const n    = Number(document.getElementById("n").value);
  const pmt  = Number(document.getElementById("pmt").value || 0); // $ per period
  const due  = document.querySelector('input[name="due"]:checked')?.value === 'beginning';

  const r = ratePct / 100; // convert percent to decimal

  const fvLump = pv * Math.pow(1 + r, n);

  let fvPmt = 0;
  if (r === 0) {
    fvPmt = pmt * n;
  } else {
    const annuityFactor = (Math.pow(1 + r, n) - 1) / r;
    fvPmt = pmt * annuityFactor * (due ? (1 + r) : 1); // annuity-due if beginning
  }

  const fv = fvLump + fvPmt;

  document.getElementById("fvResult").textContent = "Future Value: $" + fv.toFixed(2);
});

