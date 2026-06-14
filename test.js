const API_KEY = "44217c6c89cfd28d1ce9e4b0f80fb54d";

async function test() {
    const response = await fetch(
        "https://v3.football.api-sports.io/leagues?search=World Cup",
        {
            headers: {
                "x-apisports-key": API_KEY
            }
        }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log(JSON.stringify(data, null, 2));
}

test().catch(console.error);