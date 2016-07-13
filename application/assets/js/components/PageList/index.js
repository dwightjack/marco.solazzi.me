import React, {Component} from 'react';

import './_pagelist.scss';

export default class PageList extends Component {

    render() {

        const {children} = this.props;

        return (
            <div className="c-pagelist">
                {children}
            </div>
        );
    }

}

PageList.propTypes = {
    children: React.PropTypes.node
};