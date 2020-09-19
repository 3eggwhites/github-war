import React from 'react';

class Hello extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Hello {this.props.firstName} {this.props.lastName}</h1>
                {this.props.authed === true && <button onClick={this.props.logout}>Logout</button>}
            </div>
        )
    }
}

export default Hello;