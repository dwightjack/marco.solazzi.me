import React, {Component} from 'react';

import './_pagelist.scss';

export default class PageList extends Component {

    render() {

        const {children} = this.props;

        return (
            <main className="c-pagelist">
                {children}
            </main>
        );
    }

}

PageList.propTypes = {
    children: React.PropTypes.node
};