import React from 'react';

require('./counter.scss');

export default class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const counter = this.state.counter + 1;
            this.setState({counter});
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        return (
            <p>pippo: {this.state.counter}</p>
        );
    }

}