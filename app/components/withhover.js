import React from 'react';

export default function withHover(Component, propName = 'hovering') {
    return class WithHover extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                [propName]: false
            }

            this.onMouseOver = this.onMouseOver.bind(this);
            this.onMouseOut = this.onMouseOut.bind(this);
        }

        onMouseOver() {
            this.setState({
                [propName]: true
            });
        }

        onMouseOut() {
            this.setState({
                [propName]: false
            });
        }

        render() {
            const props = {
                ...this.state,
                ...this.props
            }

            return (
                <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                    <Component {...props} />
                </div>
            )
        }
    }
}