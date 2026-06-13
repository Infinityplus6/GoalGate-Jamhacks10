// import { Connection, clusterApiUrl } from "@solana/web3.js";

//solana.js

const network = "devnet";

export async function connectWallet() {
  const provider = window.solana;

  console.log(provider);

  if (!provider || !provider.isPhantom) {
    alert("Install Phantom wallet");
    return;
  }

  const resp = await provider.connect();

  return resp.publicKey.toString();
}