const _ = require("lodash");

var Helpers = {
    
    /* THINGS WE NEED
        outcome (victory or defeat)
        game duration
        summoner name
        summoner spells
        summoner runes
        champion name
        K/DA
        items bought during the match (names should be fine don't need any icons)
        champion level in the match
        total creep score
        creep score per minute (total creeps divided by game duration)
        */
    processMatchListResponse: (summonerData, matchesData) => {
        let summonerName = summonerData.name;

        return matchesData.map(match => {
            let participantId = _.find(match.participantIdentities, identity => {
                return identity.player.summonerName === summonerName;
            }).participantId;

            let participantData = _.find(match.participants, ["participantId", participantId]);
            let stats = participantData.stats;
            return {
                outcome: participantData.win ? "Victory" : "Loss",
                gameDuration: match.gameDuration,
                summonerName,
                summonerSpells: [participantData.spell1Id, participantData.spell2Id], //TODO static data
                summonerRunes: participantData.runes, //TODO static data
                championName: participantData.championId, //TODO static data
                kills: participantData.kills,
                deaths: participantData.deaths,
                assists: participantData.assists,
                items: [stats.item0, stats.item1, stats.item2, stats.item3, 
                    stats.item4, stats.item5, stats.item6].filter(Boolean), //TODO static data
                championLevel: stats.champLevel,
                totalCreepScore: stats.neutralMinionsKilled + stats.totalMinionsKilled,
                creepScorePm: stats.neutralMinionsKilled + stats.totalMinionsKilled / match.gameDuration
            }
        });
    }


};


module.exports = Helpers;