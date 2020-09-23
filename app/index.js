import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hello from './hello'
import Popular from './components/popular'
import War from './components/war'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <War />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)