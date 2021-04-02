import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = () => {
    return (
        <div className='nav-bar'>
            <div className="nav-header">
                <div className="nav-items">
                    Top
                </div>
                <div className="nav-items">
                    New
                </div>
            </div>
            <FontAwesomeIcon icon="moon" />
        </div>
    )
}

export default NavBar
