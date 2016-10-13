import React from 'react';

import './_cover.scss';

import Table, { IcoTable } from '../Table';
import pic from '../../../images/marco.jpg';

const data = {
    name: 'Marco',
    surname: 'Solazzi',
    birthday: 'October 1st 1979',
    currentLocation: 'Verona (IT)',
    nationality: 'Italian'
};

const contacts = {
    twitter: '@dwightjack',
    pencil: 'marco@solazzi.me',
    github: 'dwightjack',
    linkedin: 'in/marcosolazzi'
};

const Cover = () => (

    <div className="c-cover">

        {/*<header className="c-cover__intro h1">
            <span>Geeks.query(</span>
            <span>    '/usr/<mark>marco+solazzi</mark>',</span>
            <span>    'job=<mark>frontend</mark>'</span>
            <span>).then((me) => ...</span>
        </header>
*/}
    <section className="c-section c-cover__body">

        <figure className="c-cover__pic">
            <svg viewBox="0 0 890 890">
                <path className="stroke" d="M850 425L725.5 725.5 425 850 124.5 725.5 0 425l124.5-300.5L425 0l300.5 124.5z" />
                <g clipPath="url(#profile-clip-path)">
                    <image xlinkHref={pic} x="0" y="0" width="850" height="860" />
                </g>
                <clipPath id="profile-clip-path">
                    <path d="M850 425L725.5 725.5 425 850 124.5 725.5 0 425l124.5-300.5L425 0l300.5 124.5z" />
                </clipPath>
            </svg>
        </figure>

        <div className="c-section__body">

            <h2 className="c-cover__title">こんにちわ！</h2>
            <Table
                data={data}
            />
            <IcoTable data={contacts} />
        </div>
    </section>
    </div>

);

export default Cover;