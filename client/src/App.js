import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [], playerName: ""
    };

    this.getMatchHistory = this.getMatchHistory.bind(this);
    this.setPlayerName = this.setPlayerName.bind(this);
  }
  setPlayerName(e) {
    this.setState({playerName: e.target.value});
  }

  getMatchHistory(e) {
    let self = this;
    axios.get("http://localhost:3001/match-list?name=" + this.state.playerName)
      .then(res => {
        self.setState({ matches: res.data });
      });
    
  }

  render() {
    return (
      <div className="App">
        <input type="text" id="playerNameTextbox" onChange={this.setPlayerName}/>
        <input type="submit" id="playerNameSubmit" onClick={this.getMatchHistory} />
        <MatchHistoryList matches={this.state.matches} />
      </div>
    );
  }
}

/*
 THINGS WE NEED
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
class MatchHistoryList extends Component {

  render () {
    return (
      <ul id="matchHistory">
        {this.props.matches.map(match => (
          <li>
            <header>
              <p class="summoner-name">{match.summonerName}</p>
              <p class="outcome"><strong>{match.outcome}</strong></p>
              <p class="champion">
                Champion: {match.championName}
                Level: {match.championLevel}
              </p>
            </header>

            <div class="details">
              <p>K/D/A: {match.kills} / {match.deaths} / {match.assists}</p>
              <p>Total Creep Score: {match.totalCreepScore}</p>
              <p>Creep Score per minute: {match.creepScorePm.toFixed(2)}</p>
            </div>

            <div class="spells">
              <h4>Spells</h4>
              <ul>
                {match.summonerSpells.map(spell => (
                  <li>{spell}</li>
                ))}
              </ul>  
            </div>

            <div class="runes">
              <h4>Runes</h4>
              <ul>
                {match.summonerRunes.map(runes => (
                  <li>{runes}</li>
                ))}
              </ul>  
            </div>

            <div class="items">
              <h4>Items</h4>
              <ul>
                {match.items.map(item => (
                  <li>{item}</li>
                ))}
              </ul>  
            </div>
                  
          </li>
        ))}
      </ul>
    );
  }
}


export default App;
