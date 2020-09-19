import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hello from './hello'
import Popular from './components/popular'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Popular />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)