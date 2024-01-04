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
        readers: ["code_128_reader"],
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
