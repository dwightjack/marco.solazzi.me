import React from 'react';

import pure from '../../base/pure';
import Title from '../Title';

import './_section.scss';


export const Section = ({children, title, prefix}) => (
    <section className="c-section">
        <Title className="c-section__title" prefix={prefix} title={title} />
        <div className="c-section__body">
            {children}
        </div>
    </section>
);


Section.propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string,
    prefix: React.PropTypes.string
};

export default pure(Section);
