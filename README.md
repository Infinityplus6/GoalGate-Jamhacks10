# GoalGate - Jamhacks 10

A dynamic NFT marketplace where World Cup team NFTs change value based on real-world performance.

## Team
- Maaz Siddiqui (https://github.com/Infinityplus6)
- Ethan Wang (https://github.com/WangEthan301)

## Demo
https://goal-gate-jamhacks10.vercel.app/

## Devpost
https://devpost.com/software/goal-gate?

## Inspiration
The 2026 FIFA World Cup is one of the largest sporting events in the world, bringing together fans from every country. We wanted to build something that captured the excitement and unpredictability of the tournament while also exploring blockchain technology.

At the same time, we were interested in learning and experimenting with the Solana ecosystem. Instead of creating a traditional NFT collection, we wanted to build NFTs whose value is tied to real-world events. This led us to the idea of GoalGate: a dynamic NFT marketplace where a country's NFT changes in value based on its World Cup performance.

---

## What it does
GoalGate is a dynamic NFT collectible marketplace powered by Solana.

Users can:
- Browse NFTs representing World Cup nations.
- Purchase and mint NFTs using their Phantom Wallet.
- View dynamically changing NFT prices based on live World Cup performance.
- Store ownership information directly through their connected wallet.
- View their purchased NFTs through their wallet address (explorer.solana.com).
- Make sure to have the Phantom Wallet extension for connection

Unlike traditional NFT collections with fixed pricing, GoalGate uses real-time World Cup statistics to determine each country's NFT value. Strong performances increase an NFT's market value, while weaker performances result in lower prices.

This creates a collectible experience that evolves alongside the tournament itself.

---

## How we built it

### Frontend
- HTML
- CSS
- JavaScript

### Blockchain & Wallet Integration
- Solana
- Phantom Wallet
- Solana Web3.js

### Data & Storage
- API-Football
- Pinata IPFS Storage

### Architecture
1. GoalGate retrieves live World Cup data through API-Football.
2. Team statistics such as wins, losses, points, and goal differential are processed.
3. A custom pricing algorithm calculates the NFT value for each country.
4. Users connect their Phantom Wallet.
5. When a user selects an NFT and clicks **Mint**, a Solana transaction is generated and approved through Phantom.
6. NFT metadata and assets are stored through Pinata.
7. Users can later view their purchases using their wallet address.

---

## Challenges we ran into

### Finding reliable real-time data
One of our biggest challenges was obtaining accurate and reliable World Cup data. We experimented with multiple approaches:

- An initial sports API that produced inconsistent updates.
- A temporary hardcoded JSON dataset.
- Multiple pricing calculation models.

Eventually, we found an API that provided dependable real-time tournament statistics and allowed us to build the dynamic pricing system we envisioned.

### NFT Storage
Originally, we planned to use NFT.Storage for asset hosting. However, after implementation we discovered several features we needed were behind paid plans. This forced us to quickly pivot and migrate our storage infrastructure to Pinata.

### Learning Solana
Since Solana was a new technology for our team, we spent significant time learning:
- Wallet connections
- Transaction signing
- Authorization flows
- NFT minting concepts
- Blockchain storage best practices

### Hackathon Time Constraints
As first-time hackathon participants, balancing feature development, debugging, presentation preparation, and deployment within a limited timeframe was a major challenge.

---

## Accomplishments that we're proud of

- Successfully integrating real-time World Cup data into NFT pricing.
- Building a complete Solana-powered NFT purchasing experience.
- Implementing Phantom Wallet authentication and transaction approval.
- Learning and deploying blockchain technologies within a single hackathon.
- Creating a project that connects real-world sporting events with digital collectibles.
- Successfully pivoting our architecture when APIs and storage solutions didn't work as expected.
- Delivering a fully functional prototype within the hackathon timeframe.

---

## What we learned

### Technical Skills
- Solana blockchain development
- Phantom Wallet integration
- Transaction authorization and payment processing
- IPFS-based NFT storage
- API integration and data processing
- Dynamic pricing systems
- Frontend development and user experience design

### Soft Skills
- Rapid prototyping
- Time management
- Team collaboration
- Problem solving under pressure
- Adapting to changing technical requirements
- Presenting technical concepts clearly

Most importantly, we learned how to take an idea from concept to a working product in a short amount of time.

---

## What's next for GoalGate?

### Dynamic NFT Artwork
Currently, team performance affects NFT pricing. In future versions, the NFT artwork itself will evolve based on tournament performance, allowing the visual appearance of the NFT to change as teams advance.

### Full Marketplace Functionality
We want to allow users to:
- Buy NFTs
- Sell NFTs
- Trade NFTs with other users

### Oracle Integration
To support secure marketplace pricing, we plan to integrate decentralized oracle feeds that can reliably bring real-world sports data onto the blockchain.

### Portfolio Analytics
Users will be able to track:
- NFT value changes
- Team performance trends
- Portfolio profit/loss
- Historical price charts

### Expanded Sporting Events
Beyond the FIFA World Cup, GoalGate could support:
- UEFA Champions League
- FIFA Club World Cup
- Olympic Football
- International tournaments across multiple sports

### Community Features
Future versions could include:
- Leaderboards
- Collections and achievements
- Prediction contests
- Tournament-based rewards

Our long-term vision is to create a platform where real-world sports performance directly drives the value and evolution of digital collectibles.
