import React from 'react';

import './counter.scss';
import image from '../../../images/photo-demo.jpg';

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
            <div>
                <p className="c-counter">pippo matto: {this.state.counter}</p>
                <img src={image} alt="" width="500" />
            </div>
        );
    }

}