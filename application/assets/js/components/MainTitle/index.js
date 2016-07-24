import React from 'react';
import PureComponent from '../../base/PureComponent';
import Title from '../Title';

class MainTitle extends PureComponent {

    render() {
        return <Title className="c-main-title" prefix="me" title="jobs.current" />;
    }
}


export default MainTitle;
