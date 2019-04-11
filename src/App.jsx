import React, { Component } from 'react';
import './App.scss';


class App extends Component {

  render() {
    return (
      <div className="App">
        <img id="team-1-logo" className="logo" alt="blueleft" src="/assets/Blue-left.jpg"></img>
        <img id="team-2-logo" className="logo" alt="blueright" src="/assets/Blue-right.jpg"></img>
        <div id="timer" className="timer">00.00</div>
        <table>
          <tbody>
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
              <td colSpan={3} id="team_a_score">3</td>
              <td colSpan={3} id="team_b_score">3</td>
              <td></td>
            </tr>
            <tr className="score_customval_placeholder">
              <td></td>
              <td colSpan={3} className="team_customval"><span id="team-a-cval"></span></td>
              <td colSpan={3} className="team_customval"><span id="team-b-cval"></span></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <table className="footer_bar">
          <tbody>
            <tr>
              <td></td>
              <td id="footer_connection_status"></td>
            </tr>
          </tbody>
        </table>

        <div id="configpage">
          Your access key: <span id="myaccesskey" >[Connecting...]</span><br />
          <label htmlFor="mirrorkey">Mirroring key: </label><input type="text" id="mirrorkey" />
          <button onClick="connectMirror($('#mirrorkey').val())">OK</button><br />
          <button onClick="$('#configpage').hide()">Close</button>
        </div>



      </div>
    );
  }
}

export default App;
