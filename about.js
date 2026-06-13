//about.js

import { connectWallet } from "./solana.js";

let wallet = null;

const connectBtn = document.getElementById("connect");
const walletDisplay = document.getElementById("walletAddress");

console.log("JS loaded");

console.log(`window.solana.isConnected: ${window.solana.isConnected}`)


connectBtn.addEventListener("click", async () => {
  console.log("Button clicked");

  try {
    console.log("Before connect");

    const resp = await window.solana.connect({
      onlyIfTrusted: false
  });

    console.log("After connect");
    console.log(resp);

    walletDisplay.textContent = resp.publicKey.toString();

  } catch (err) {
    console.error("Connect failed:", err);
  }
});

console.log("Checking Phantom...");

console.log("window.solana =", window.solana);

if (window.solana) {
  console.log("Phantom detected");
} else {
  console.log("Phantom NOT detected")
};