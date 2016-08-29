import React, { PureComponent } from 'react';

import './_page.scss';

export default class Page extends PureComponent {

    render() {

        const {children} = this.props;

        return (
            <section className="c-page">
                <div className="c-page__body">
                    {children}
                </div>
            </section>
        );
    }

}

Page.propTypes = {
    children: React.PropTypes.node
};
