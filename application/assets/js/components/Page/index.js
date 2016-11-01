import React from 'react';

import './_page.scss';

const Page = ({children}) => (
    <section className="c-page">
        <div className="c-page__body">
            {children}
        </div>
    </section>
);

Page.propTypes = {
    children: React.PropTypes.node
};

export default Page;