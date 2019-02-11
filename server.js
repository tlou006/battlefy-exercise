process.env.LEAGUE_API_KEY = "RGAPI-950201d9-4efc-4288-9fcc-cb2923f98425";

const Express = require("express");
const app = Express();
const { Kayn, REGIONS } = require("kayn");
const KaynClient = Kayn(process.env.LEAGUE_API_KEY)();

app.get("/", async (req, res, next) => {
    res.send("Battlefy exercise app API");
});

app.get("/match-list", async (req, res, next) => {
    const summoner = await KaynClient.Summoner.by.name(req.query.name);
    // TODO should i be filtering on queue: 420?? why dont all the examples have this
    const matchlist = await KaynClient.Matchlist.by.accountID(summoner.accountId);
    const recentMatchIds = matchlist.matches.slice(0, 10)
                                .map((match) => { return match.gameId });
    const matchRequests = recentMatchIds.map(KaynClient.Match.get);
    const recentMatches = await Promise.all(matchRequests); 

    res.json(recentMatches);
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});


