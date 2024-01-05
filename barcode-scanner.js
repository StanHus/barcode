document.addEventListener("DOMContentLoaded", function () {
  var scannerActive = true;
  var lastScannedCode = "";

  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#interactive"),
        constraints: {
          facingMode: "environment",
        },
      },
      decoder: {
        readers: ["ean_reader"],
      },
    },
    function (err) {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
      document.getElementById("toggle").style.display = "block";
    }
  );

  Quagga.onDetected(function (data) {
    lastScannedCode = data.codeResult.code;
    verify();
  });

  document.getElementById("toggle").addEventListener("click", function () {
    if (scannerActive) {
      document.getElementById("interactive").style.display = "none";
      document.getElementById("verify").style.display = "block";
      document.getElementById("manualInput").style.display = "block";
      Quagga.stop();
    } else {
      window.location.reload();
      // Quagga.start();
    }
    scannerActive = !scannerActive;
  });

  const verify = () => {
    const hardcodedBarcode = "5010102243149";
    const inputBarcode = scannerActive
      ? lastScannedCode.slice(-4)
      : document.getElementById("manualInput").value;

    console.log(inputBarcode, hardcodedBarcode, hardcodedBarcode.slice(-4));

    const match =
      inputBarcode === hardcodedBarcode.slice(-4) ||
      (scannerActive && inputBarcode === hardcodedBarcode.slice(-4));

    if (match) {
      Quagga.stop();
      let countdown = 5;
      document.getElementById("result").innerHTML =
        "Match, redirecting in <br />" + countdown + " seconds";

      // Update the countdown every second
      let intervalId = setInterval(() => {
        countdown--;
        document.getElementById("result").innerHTML =
          "Match, redirecting in <br />" + countdown + " seconds";

        if (countdown <= 0) {
          clearInterval(intervalId); // Clear interval once countdown is finished
          window.location.href = "/match.html"; // Redirect after countdown
        }
      }, 1000);
    } else {
      document.getElementById("result").innerText = "No Match";
    }
  };

  document.getElementById("verify").addEventListener("click", verify);
});
