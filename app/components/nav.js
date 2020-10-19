import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

import { ThemeConsumer } from '../contexts/theme';
import ToolTip from '../components/tooltip';

const actactiveStyle = {
    color: 'rgb(187, 46, 31)'
}

export default function Nav() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <nav className='row space-between'>
                    <ul className='row nav'>
                        <li>
                            <NavLink
                                to='/'
                                exact
                                className='nav-link'
                                activeStyle={actactiveStyle}
                            >
                                Popular
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/war'
                                className='nav-link'
                                activeStyle={actactiveStyle}
                            >
                                Battle
                            </NavLink>
                        </li>
                    </ul>
                    <button
                        style={{ fontSize: 30 }}
                        className='btn-clear'
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ?
                            <ToolTip hoverText={'Dark Mode'}>
                                <FaMoon color='#727272' size={24} />
                            </ToolTip>
                            :
                            <ToolTip hoverText={'Light Mode'}>
                                <FaSun color='rgb(255, 215, 0)' size={24} />
                            </ToolTip>
                        }
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}