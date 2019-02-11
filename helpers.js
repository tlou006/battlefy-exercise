const _ = require("lodash");
const fs = require("fs");

const championsData = JSON.parse(fs.readFileSync('./data/champions.json', 'utf8'));
const itemsData = JSON.parse(fs.readFileSync('./data/items.json', 'utf8'));
const summonersData = JSON.parse(fs.readFileSync('./data/summoners.json', 'utf8'));
const runesData = JSON.parse(fs.readFileSync('./data/runes.json', 'utf8'));

const Helpers = {


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
            let summonerSpells = [participantData.spell1Id, participantData.spell2Id]
                .filter(Boolean)
                .map(spellId => _.find(summonersData, ["key", String(spellId)]))
                .filter(Boolean)
                .map(spell => spell.name);
            
            let items = [stats.item0, stats.item1, stats.item2, stats.item3, 
                stats.item4, stats.item5, stats.item6]
                    .filter(Boolean)
                    .map(itemId =>  itemsData[itemId])
                    .filter(Boolean)
                    .map(item => item.name);

            let championName = _.find(championsData, ["key", String(participantData.championId)]).name;
            let summonerRunes = [stats.perk0, stats.perk1, stats.perk2, stats.perk3, 
                stats.perk4, stats.perk5]
                    .filter(Boolean)
                    .map(perkId => _.find(runesData, ["id", perkId]))
                    .filter(Boolean)
                    .map(rune => rune.name);

            return {
                outcome: participantData.win ? "Victory" : "Loss",
                gameDuration: match.gameDuration,
                summonerName,
                summonerSpells,

                summonerRunes, 
                championName,
                kills: participantData.kills,
                deaths: participantData.deaths,
                assists: participantData.assists,

                items,

                championLevel: stats.champLevel,
                totalCreepScore: stats.neutralMinionsKilled + stats.totalMinionsKilled,
                creepScorePm: stats.neutralMinionsKilled + stats.totalMinionsKilled / match.gameDuration
            }
        });
    },



};


module.exports = Helpers;