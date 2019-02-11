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
  }

  getMatchHistory() {
    let self = this;
    axios.get("http://localhost:3001/match-list?name=C9 Sneaky")
      .then(res => {
        console.log("finished request");
        debugger; 
        self.setState({ matches: res.data });
      });
    
  }

  render() {
    return (
      <div className="App">
        <input type="text" id="playerNameTextbox" />
        <input type="submit" id="playerNameSubmit" onClick={this.getMatchHistory} />
        <MatchHistoryList matches={this.state.matches} />
      </div>
    );
  }
}

class MatchHistoryList extends Component {

  render () {
    return (
      <ul id="matchHistory">
        {this.props.matches.map(match => (
          <li key={match.championName}>
            <div></div>        
          </li>
        ))}
      </ul>
    );
  }
}


export default App;
