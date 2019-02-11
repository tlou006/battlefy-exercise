process.env.LEAGUE_API_KEY = "RGAPI-950201d9-4efc-4288-9fcc-cb2923f98425";

const Express = require("express");
const app = Express();
const { Kayn, REGIONS } = require("kayn");
const KaynClient = Kayn(process.env.LEAGUE_API_KEY)();

app.get("/", async (req, res, next) => {
    const summoner = await KaynClient.Summoner.by.name(req.query.name);
    res.json(summoner);
    //res.send("Battlefy exercise app API");
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});


