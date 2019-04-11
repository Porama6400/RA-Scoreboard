import React, { Component } from 'react';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <img id="team-1-logo" className="logo" src="#"></img>
        <img id="team-2-logo" className="logo" src="#"></img>
        <div id="timer" className="timer">00.00</div>
        <table>
          <tr className="page_top_padding">
            <td></td>
            <td></td>
            <td className="tablecolfixer"></td>
            <td className="tablecolfixer"></td>
            <td className="tablecolfixer"></td>
            <td className="tablecolfixer"></td>
            <td></td>
            <td></td>
          </tr>
          <tr className="score_placeholder">
            <td></td>
            <td colspan="3" id="team_a_score">3</td>
            <td colspan="3" id="team_b_score">3</td>
            <td></td>
          </tr>
          <tr className="score_customval_placeholder">
            <td></td>
            <td colspan="3" class="team_customval"><span id="team-a-cval"></span></td>
            <td colspan="3" class="team_customval"><span id="team-b-cval"></span></td>
            <td></td>
          </tr>
        </table>
        <table className="footer_bar">
          <tr>
            <td></td>
            <td id="footer_connection_status"></td>
          </tr>
        </table>

        <div id="configpage">
          Your access key: <span id="myaccesskey" >[Connecting...]</span><br />
          <label for="mirrorkey">Mirroring key: </label><input type="text" id="mirrorkey" />
          <button onclick="connectMirror($('#mirrorkey').val())">OK</button><br />
          <button onclick="$('#configpage').hide()">Close</button>
        </div>



      </div>
    );
  }
}

export default App;
