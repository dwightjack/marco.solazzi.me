import React, { Component } from 'react';

import { createRefs } from '../../base/utils';

import './_page.scss';

class Page extends Component {

    constructor(props) {
        super(props);

        createRefs(this, 'root');
    }

    render() {
        const {children, id, name} = this.props;

        return (
            <section className="c-page" id={id} name={name} ref={this.rootRef} tabIndex="-1">
                <div className="c-page__body">
                    {children}
                </div>
            </section>
        );
    }
}

Page.propTypes = {
    children: React.PropTypes.node,
    id: React.PropTypes.string,
    name: React.PropTypes.string
};

export default Page;