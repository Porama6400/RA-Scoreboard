import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from 'socket.io-client'
import './index.css';

import * as serviceWorker from './serviceWorker';

//Components
import ConfigTable from './components/config'
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
                <h1>Scoreboard Configuation</h1>



                <button onClick={() => this.send()}>Change color</button>

                <button onClick={() => this.setColor('blue')}>Blue</button>
                <button onClick={() => this.setColor('red')}>Red</button>
                <button onClick={() => this.setColor('white')}>white</button>

                <ConfigTable />
            </div>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
