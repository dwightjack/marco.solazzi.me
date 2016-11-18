import React, { Component } from 'react';
import { connect } from 'react-redux';

import mq from '../../base/mq';

export class MediaQuery extends Component {

    render() {
        const { breakpoint, currentBp } = this.props;

        if (typeof this.props.children === 'function') {
            return this.props.children(currentBp, mq);
        }

        if (currentBp === breakpoint) {
            return this.props.children;
        }

        return null;

    }

}

MediaQuery.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.node,
        React.PropTypes.func
    ]),
    breakpoint: React.PropTypes.string,
    currentBp: React.PropTypes.string
};

const mapStateToProps = ({breakpoint}) => ({currentBp: breakpoint});

export default connect(
    mapStateToProps
)(MediaQuery);