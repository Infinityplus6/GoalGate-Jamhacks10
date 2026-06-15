# GoalGate-Jamhacks10

Inspiration
We wanted to take advantage of some current events, and so we decided to mke your project somehow relate to the world cup. We also wanted to incorporate Solana into our project since it is a new tool we wanted to try out.

What it does
This is a dynamic NFT collectible marketplace, where users can purchase country NFTs for varying amounts of Solana, the amount one has to pay for a specific country depends on the teams performance.

How we built it
We used an API link to receive live-time updates about the 2026 World Cup, which allows for dynamic pricing for our NFTs. The user saves their purchasing data by linking their Phantom Wallet. When users click "mint" on a NFT, they get an authorization pop-up all done by Solana Then users can view their purchases by going to link and pasting their phantom wallet address. The NFTs are stored using Pinata Storage.

Challenges we ran into
Finding a correct API, we went through a few iterations of dynamic updating, from initially a buggy API, to hard-coding a JSON, to finally arriving at an API thta provides reliable real-time updates.

Another issue was finding a way to store our NFTs. Initially we tried storing it using NFTStorage, however we found out that its features were locked behind a paywall, so we switched to Pinata Storage.

Accomplishments that we're proud of
We are proud of our ability to make a project using a new code architecture we learned for the first time during this hackathon, we are super proud of the functionality of our project, and how it was able to connect to a real-time event (World Cup).

What we learned
Throughout this project we learned a variety of hard and soft skills. On the technical side we learned how to use Solana and Phantom in our JS code, and how to manage payments and authorize accounts. We also learned how to work with Pinata Storage and incorporating our project with APIs. In terms of soft skills we learned how to work during a hackathon for the first time, and had to do a lot of time-management and optimizations/iterations to ensure we could ship our project.

What's next for Goal Gate
Future plans will mostly revolve around making the NFTs themselves dynamic in nature, so the teams performance will also be reflected in the NFT itself rather than just in the price. We also hope to add a selling feature as then we can incorporate an Oracle feed system, and make it a fully operational marketplace.
