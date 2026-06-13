const API_KEY = "44217c6c89cfd28d1ce9e4b0f80fb54d";

fetch(
    "https://v3.football.api-sports.io/leagues?search=World Cup",
    {
        headers: {
            "x-apisports-key": API_KEY
        }
    }
)
.then(res => res.json())
.then(data => {
    console.log(JSON.stringify(data, null, 2));
})
.catch(console.error);
