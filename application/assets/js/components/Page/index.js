import React from 'react';

import './_page.scss';

const Page = ({children, id, name}) => (
    <section className="c-page" id={id} name={name}>
        <div className="c-page__body">
            {children}
        </div>
    </section>
);

Page.propTypes = {
    children: React.PropTypes.node,
    id: React.PropTypes.string,
    name: React.PropTypes.string
};

export default Page;