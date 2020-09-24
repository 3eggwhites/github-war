import React from 'react';
import PropType from 'prop-types';

export default function Cards({ header, subheader, avatar, href, name, children }) {
    return (
        <div className='card bg-light'>
            <h4 className='header-lg center-text'>
            {header}
            </h4>
            <img
                src={avatar}
                alt={`Avatar for ${name}`}
                className='avatar'
            />
            {subheader && (
                <h4 className='center-text'>
                    {subheader}
                </h4>
            )}
            <h2 className='center-text'>
                <a className='link' href={href}>
                {name}
                </a>
            </h2>
            {children}
        </div>
    )
}

Cards.propTypes = {
    header: PropType.string.isRequired,
    subheader: PropType.string,
    avatar: PropType.string.isRequired,
    href: PropType.string.isRequired,
    name: PropType.string.isRequired
}