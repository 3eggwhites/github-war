import React from 'react';
import PropType from 'prop-types';
import Hover from './hover'

const styles = {
    container: {
        position: 'relative',
        display: 'flex'
    },
    tooltip: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '160px',
        bottom: '100%',
        left: '50%',
        marginLeft: '-80px',
        borderRadius: '3px',
        backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
        padding: '7px',
        marginBottom: '5px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '14px',
    }
}

export default function ToolTip({ hoverText, children }) {
    return (
        <Hover>
            {(hover) => (
                <div style={styles.container}>
                    {hover === true && <div style={styles.tooltip}> {hoverText} </div>}
                    {children}
                </div>
            )}
        </Hover>
    )
}

ToolTip.propTypes = {
    hoverText: PropType.string.isRequired
}