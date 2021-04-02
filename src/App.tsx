import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import NavBar from './components/NavBar';

library.add(faSun, faMoon);

export default class App extends Component {
    render() {
        return (
            <div className='day'>
                <div className='container'>
                    <NavBar />
                </div>
            </div>
        )
    }
}