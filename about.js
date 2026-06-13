//about.js

import { connectWallet } from "./solana.js";
import { worldCupTeams } from "./teams.js";
import { Connection, clusterApiUrl } from "https://esm.sh/@solana/web3.js";
import { Metaplex } from "https://esm.sh/@metaplex-foundation/js";
import { walletAdapterIdentity } from "https://esm.sh/@metaplex-foundation/js@0.20.1";


const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = Metaplex.make(connection);

let wallet = null;

const connectBtn = document.getElementById("connect");
const walletDisplay = document.getElementById("walletAddress");


connectBtn.addEventListener("click", async () => {

  wallet = await connectWallet();

  if (!wallet) return;

  walletDisplay.textContent = "Connected: " + wallet;
});

console.log(worldCupTeams);
console.log(typeof worldCupTeams[0]);


const selectContainer = document.getElementById("search");
const nftContainer = document.getElementById("nft-container");
function nftCards(input) {

  let nfts = worldCupTeams.filter(element => element.name.toLowerCase().includes(input.toLowerCase()));


  return nfts
    .map(element => {
      return `
          <div class="card">
            <h2>${element.name}</h2>
            <img src="${element.flag}" width="60px" height="auto" border="2px solid black" />
            <p>Goals: ${element.goals}</p>
            <p>W/L/T:<br>${element.wins} / ${element.losses} / ${element.draws}</p>
            <button onclick="mintNFT('${element.name}')">
              Mint
            </button>
          </div>
        `;
    })
}

selectContainer.addEventListener("input", () => {
  nftContainer.innerHTML = nftCards(selectContainer.value).join("");
});

nftContainer.innerHTML = nftCards(selectContainer.value).join("");

function buildMetadata(team) {
  return {
    name: `${team.name} World Cup NFT`,
    description: "Dynamic soccer NFT",
    image: team.flag,
    attributes: [
      { trait_type: "Goals", value: team.goals },
      { trait_type: "Wins", value: team.wins },
      { trait_type: "Losses", value: team.losses },
      { trait_type: "Draws", value: team.draws },
      { trait_type: "Goal Diff", value: team.goalDiff }
    ]
  };
}

async function uploadImage(team) {
  const blob = await fetch(team.flag).then(r => r.blob());

  const form = new FormData();
  form.append("file", blob, `${team.code}.png`);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      pinata_api_key: "dfda45c9c765d1582026",
      pinata_secret_api_key: "94cddce944a7ee63cfc8b04b3c376553396b650413691e9abb34495aaea18c8a"
    },
    body: form
  });

  const data = await res.json();

  console.log("Pinata image response:", data);

  if (!res.ok) {
    console.log("Pinata error response:", data);
    throw new Error("Pinata image upload request failed");
  }

  if (!data.IpfsHash) {
    console.log("Invalid Pinata response:", data);
    throw new Error("Image upload failed (no IpfsHash returned)");
  }

  return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
}

async function uploadMetadata(team) {
  const imageUrl = await uploadImage(team);

const metadata = {
  name: `${team.name} World Cup NFT`,
  symbol: "WC2026",
  description: "World Cup national team NFT card",

  image: imageUrl,

  properties: {
    files: [
      {
        uri: imageUrl,
        type: "image/png"
      }
    ]
  },

  attributes: [
    { trait_type: "Goals", value: String(team.goals) },
    { trait_type: "Wins", value: String(team.wins) },
    { trait_type: "Losses", value: String(team.losses) },
    { trait_type: "Draws", value: String(team.draws) },
    { trait_type: "Goal Diff", value: String(team.goalDiff) }
  ]
};

  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: "dfda45c9c765d1582026",
      pinata_secret_api_key: "94cddce944a7ee63cfc8b04b3c376553396b650413691e9abb34495aaea18c8a"
    },
    body: JSON.stringify(metadata)
  });

  const data = await res.json();

  if (!data.IpfsHash) {
    throw new Error("Metadata upload failed");
  }

  return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
}
let minting = false;

window.mintNFT = async (teamName) => {
  if (minting) return;
  minting = true;

  try {
    console.log("Mint clicked:", teamName);

    const team = worldCupTeams.find(t => t.name === teamName);
    console.log("Selected team:", team);

    const metadataUrl = await uploadMetadata(team);

    const provider = window.solana;

    if (!provider?.isPhantom) {
      alert("Install Phantom");
      return;
    }

    if (!provider.isConnected) {
      const resp = await provider.connect();
    }

    metaplex.use(walletAdapterIdentity(provider));

    const { nft } = await metaplex.nfts().create({
      uri: metadataUrl,
      name: team.name,
      sellerFeeBasisPoints: 0
    });

    console.log("Mint success:", nft.address.toString());
  } catch (err) {
    console.error(err);
  } finally {
    minting = false;
  }
};

// Function that calculates card price for each country, takes in object parameter
function calculatePrice(team) {
  const base = 50;

  const goals = team.goals * 8;
  const wins = team.wins * 15;
  const draws = team.draws * 7;
  const losses = team.losses * 10;
  const gd = team.goalDiff * 5;

  let price = base + goals + wins + draws + gd - losses;

  // hype modifier
  if (team.losses === 0) price *= 1.25;
  if (team.goalDiff > 5) price *= 1.2;

  return price;
}

/* 
converts each team object into a new object with the same 
properties but also includes a price property calculated by 
the calculatePrice function, then creates a new object with 
the team names as keys and the new objects as values
*/

const teamsWithPrice = Object.fromEntries(
  worldCupTeams.map(team => [
    team.name,
    { ...team, price: calculatePrice(team) }
  ])
);
// e.g. teamsWithPrice["Brazil"].price gives the price of the Brazil card 
