import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import './index.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      endpoint: "localhost:4001", //target
      color: 'white' //current color 
    }
  }

  // socket.io func
  //color 
  send = function () {
    const socket = socketIOClient(this.state.endpoint); //set target
    socket.emit("change color", this.state.color) // set color to current color
  }

  setColor = function (color) {
    this.setState({ color })
  }
  //color end

  componentDidMount = function () {
    const socket = socketIOClient(this.state.endpoint) //set target
    setInterval(this.send(), 1000) //refresh color every 1000
    socket.on('change color', function (col) {
      document.body.style.backgroundColor = col;
    })

  }

  render() {
    const socket = socketIOClient(this.state.endpoint)
    socket.on('change color', function (col) {
      document.body.style.backgroundColor = col;
    })

    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send()}>Change color</button>

        <button onClick={() => this.setColor('blue')}>Blue</button>
        <button onClick={() => this.setColor('red')}>Red</button>
      </div>
    );
  }
}

export default App;
