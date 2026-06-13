//about.js

import { connectWallet } from "./solana.js";

let wallet = null;

const connectBtn = document.getElementById("connect");
const walletDisplay = document.getElementById("walletAddress");

console.log("JS loaded");


connectBtn.addEventListener("click", async () => {
    wallet = await connectWallet();

    walletDisplay.textContent = "Connected: " + wallet;
});

console.log("Checking Phantom...");

console.log("window.solana =", window.solana);

if (window.solana) {
  console.log("Phantom detected");
} else {
  console.log("Phantom NOT detected")
};