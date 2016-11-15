import React, { Component } from 'react';

import mq from '../../base/mq';

export default class MediaQuery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMq: null
        };
    }

    componentDidMount() {
        this.bind = mq.bind((currentMq) => this.setState({currentMq}), true);
    }

    componentWillUnmount() {
        if (this.bind) {
            this.bind.cancel();
        }
    }

    render() {
        const { children, breakpoints } = this.props;
        const { currentMq } = this.state;
        const el = breakpoints[currentMq] || this.props.default;

        console.log(currentMq);

        return React.cloneElement(
            el(),
            null,
            children
        );
    }

}

MediaQuery.propTypes = {
    breakpoints: React.PropTypes.objectOf(
        React.PropTypes.func
    ),
    children: React.PropTypes.node,
    default: React.PropTypes.func
};

MediaQuery.defaultProps = {
    breakpoints: {},
    default: () => 'div'
};