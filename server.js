// Azure sets the env.PORT
process.env.PORT = process.env.PORT || 3000;
process.env.LEAGUE_API_KEY = "RGAPI-ada267e0-1684-4e20-bea5-4c4db3a69ba6";

const Express = require("express");
const app = Express().set('json spaces', 2);
const { Kayn, REGIONS } = require("kayn");
const KaynClient = Kayn(process.env.LEAGUE_API_KEY)();
const Helpers = require("./helpers");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", async (req, res, next) => {
    res.send("Battlefy exercise app API");
});

app.get("/match-list", async (req, res, next) => {
    const summoner = await KaynClient.Summoner.by.name(req.query.name);
    // TODO should i be filtering on queue: 420?? why dont all the examples have this
    const matchlist = await KaynClient.Matchlist.by.accountID(summoner.accountId);
    const recentMatchRequests = matchlist
                                    .matches.slice(0, 10)
                                    .map((match) => { return match.gameId })
                                    .map(KaynClient.Match.get);
    const recentMatches = await Promise.all(recentMatchRequests); 

    res.json(Helpers.processMatchListResponse(summoner, recentMatches));
});

app.listen(process.env.PORT, () => {
 console.log("Server running");
});


