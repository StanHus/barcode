// import Quagga from "quagga"; // ES6
// // const Quagga = require("quagga").default; // Common JS (important: default)

document.addEventListener("DOMContentLoaded", function () {
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
        readers: [
          // "upc_reader",
          // "upc_e_reader",
          "ean_reader",
          // "code_128_reader",
          // "code_39_reader",
          // "code_39_vin_reader",
          // "codabar_reader",
          // "i2of5_reader",
          // "2of5_reader",
          // "code_93_reader",
        ],
      },
    },
    function (err) {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
    }
  );

  Quagga.onDetected(function (data) {
    console.log(data.codeResult.code);
    // print the code on the screen
    let barcode = document.querySelector("#barcode");
    barcode.innerHTML = data.codeResult.code;
  });
});
