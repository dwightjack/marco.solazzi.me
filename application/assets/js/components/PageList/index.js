import React from 'react';

import pure from '../../base/pure';
import './_pagelist.scss';


export const PageList = ({children}) => (
    <main className="c-pagelist">
        <span className="c-pagelist__glyph" />
        {children}
    </main>
);

PageList.propTypes = {
    children: React.PropTypes.node,
    glyph: React.PropTypes.string
};

export default pure(PageList);
