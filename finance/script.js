document.getElementById("fvForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stops the page refresh

    const pv = Number(document.getElementById("pv").value);
    const rate = Number(document.getElementById("rate").value);
    const n = Number(document.getElementById("n").value);

    const fv = pv * Math.pow(1 + rate, n);

    document.getElementById("fvResult").textContent =
        "Future Value: $" + fv.toFixed(2);
});
