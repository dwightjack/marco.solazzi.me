import React from 'react';

import './_cover.scss';

import Table from '../Table';
import List, { ListItem } from '../List';
import { AnchorIco } from '../Anchor';
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

const contacts = (
    <List>
        <ListItem>
            <AnchorIco className="u-link--mark" ico="twitter" label="@dwightjack" link="https://twitter.com/dwightjack" />
        </ListItem>
        <ListItem>
            <AnchorIco className="u-link--mark" ico="pencil" label="marco@solazzi.me" link="mailto:marco@solazzi.me" />
        </ListItem>
        <ListItem>
            <AnchorIco className="u-link--mark" ico="github" label="dwightjack" link="https://github.com/dwightjack" />
        </ListItem>
        <ListItem>
            <AnchorIco className="u-link--mark" ico="linkedin" label="in/marcosolazzi" link="https://it.linkedin.com/in/marcosolazzi" />
        </ListItem>
    </List>
);

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
                {contacts}
            </div>
        </section>
    </div>

);

export default Cover;