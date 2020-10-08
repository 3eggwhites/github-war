import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Hello from './hello';
import Popular from './components/popular';
import War from './components/war';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/nav';
import Results from './components/results';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }
    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className="container">
                            <Nav />
                            <Switch>
                                <Route exact path='/' component={Popular} />
                                <Route exact path='/war' component={War} />
                                <Route path='/war/results' component={Results} />
                                <Route render={() => <h1>404</h1>} />
                            </Switch>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)