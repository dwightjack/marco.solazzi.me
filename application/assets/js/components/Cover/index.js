import React from 'react';

import './_cover.scss';

import Table, { IcoTable } from '../Table';
import Avatar from '../Avatar';
import pic from '../../../images/marco.jpg';
import svg from '../../../images/circuits.svg';


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

            <Avatar src={pic} className="c-cover__pic" />

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