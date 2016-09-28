import React from 'react';

import './_cover.scss';

const Cover = () => (

    <div className="c-cover">

        <div className="c-cover__body h1">
            <span>Geeks.query(</span>
            <span>    '/usr/<mark>marco+solazzi</mark>',</span>
            <span>    'job=<mark>frontend</mark>'</span>
            <span>).then((me) => ...</span>
        </div>

    </div>

);

export default Cover;