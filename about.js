// about.js
// imports
import { connectWallet } from "./solana.js";
import { worldCupTeams } from "./teams.js";
import { Connection, clusterApiUrl } from "https://esm.sh/@solana/web3.js";
import { Metaplex } from "https://esm.sh/@metaplex-foundation/js";
import { walletAdapterIdentity } from "https://esm.sh/@metaplex-foundation/js@0.20.1";
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL, Transaction } from "https://esm.sh/@solana/web3.js";


const nftContainer = document.getElementById("nft-container");


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

  return price/10000;
}

function nftCards(input) {

  let nfts = worldCupTeams.filter(element => element.name.toLowerCase().includes(input.toLowerCase()));

  return nfts
    .map(element => {
      return `
        <div class="card">
          <h2>${element.name}</h2>
          <img src="${element.flag}" class="flag" />
          <p>Goals: ${element.goals}</p>
          <p>W-L-D:<br>${element.wins}-${element.losses}-${element.draws}</p>
          <button class="mint-button" onclick="mintNFT('${element.name}')">Mint</button>
          <p>Price: ${calculatePrice(element)} SOL</p>
        </div>
      `;
  })
}

async function updateTeamStats() {
    const url = "https://api.football-data.org/v4/competitions/WC/standings";

    const response = await fetch(
      "https://corsproxy.io/?" + encodeURIComponent(url),
      {
        headers: {
          "X-Auth-Token": "af7fb6aa2e6a41af9d9ce6da39b6373d"
        }
      }
    );

    const data = await response.json();

    console.log("API response:", data);
    let standings = data.standings;
    console.log(standings);
    let count = 0;

    for(let i = 0; i < 12;i++)  {
      for(let j = 0; j < 4;j++) {
        let path = standings[i].table[j];
        let index = worldCupTeams.findIndex(team => team.name === path.team.name);
        console.log(`index: ${count++} = ${index}`);
        if(index === -1)  {
          console.log(`${i}, ${j}`);
          continue;
        }
        console.log(worldCupTeams[index].name);
        console.log(path.team.name);
        worldCupTeams[index].goals = path.goalsFor;
        
        console.log(worldCupTeams[index].goals);
        worldCupTeams[index].wins = path.won;
        worldCupTeams[index].losses = path.lost;
        worldCupTeams[index].draws = path.draw;
        worldCupTeams[index].goalDiff = path.goalDifference;
      }
    }
  nftContainer.innerHTML = nftCards(selectContainer.value).join("");
  }


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

updateTeamStats();


selectContainer.addEventListener("input", () => {
  nftContainer.innerHTML = nftCards(selectContainer.value).join("");
});


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
    {
      trait_type: "Price",
      value: String(calculatePrice(team))
    },
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
  document.body.style.cursor = "wait";
  if (minting) return;
  minting = true;

  try {
    document.body.style.cursor = "waiting";
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
      await provider.connect();
    }

    metaplex.use(walletAdapterIdentity(provider));


    const price = calculatePrice(team);

    document.body.style.cursor = "default";

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: new PublicKey("FWKBTMLFxArTnQC6vbAjkVpeQzdVN8hnBEZPN1XwohdF"),
        lamports: Math.floor(price * LAMPORTS_PER_SOL)
      })
    );

    transaction.feePayer = provider.publicKey;

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    const { signature } = await provider.signAndSendTransaction(transaction);

    await connection.confirmTransaction(signature, "confirmed");


    //mint
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


const teamSelect = document.getElementById("teamSelect");
const statSelect = document.getElementById("statSelect");
const valueInput = document.getElementById("valueInput");
const applyBtn = document.getElementById("applyBtn");

worldCupTeams.forEach(team => {
  const opt = document.createElement("option");
  opt.value = team.name;
  opt.textContent = team.name;
  teamSelect.appendChild(opt);
});

function updateTeamStat(teamName, stat, value) {
  const team = worldCupTeams.find(t => t.name === teamName);
  if (!team) return;

  const num = Number(value);
  if (Number.isNaN(num)) return;

  team[stat] = num;
}

applyBtn.addEventListener("click", () => {
  updateTeamStat(
    teamSelect.value,
    statSelect.value,
    valueInput.value
  );

  nftContainer.innerHTML = nftCards(selectContainer.value).join("");
});
