import React, { Component } from 'react';
import { TweenMax } from 'gsap';
import classnames from 'classnames';

import './_cover.scss';

import { createRefs } from '../../base/utils';
import Table from '../../components/Table';
import List, { ListItem } from '../../components/List';
import Avatar from '../../components/Avatar';
import Ico from '../../components/Ico';
import pic from '../../../images/marco.jpg';


const data = {
    name: 'Marco',
    surname: 'Solazzi',
    birthday: 'October 1st 1979',
    currentLocation: 'Verona (IT)',
    nationality: 'Italian'
};

class Cover extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        createRefs(this, 'body');
    }

    componentWillEnter(callback) {

        this.setState({active: true});

        TweenMax.fromTo(this.body, 1, {
            xPercent: 100
        }, {
            xPercent: 0,
            onComplete: callback
        });


    }

    render() {

        const {active} = this.state;

        return (
            <section className={classnames('c-cover', {'is-active': active})}>

                <Avatar src={pic} className="c-cover__pic" />

                <div className="c-cover__body" ref={this.bodyRef}>

                    <h2 className="c-cover__headline">こんにちわ！</h2>
                    <Table
                        data={data}
                    />
                    <List>
                        <ListItem>
                            <Ico name="twitter" /> <a href="https://twitter.com/dwightjack" target="_blank" rel="noopener noreferrer">@dwightjack</a>
                        </ListItem>
                        <ListItem>
                            <Ico name="pencil" /> <a href="mailto:marco@solazzi.me" target="_blank" rel="noopener noreferrer">marco@solazzi.me</a>
                        </ListItem>
                        <ListItem>
                            <Ico name="github" /> <a href="https://github.com/dwightjack" target="_blank" rel="noopener noreferrer">dwightjack</a>
                        </ListItem>
                        <ListItem>
                            <Ico name="linkedin" /> <a href="https://it.linkedin.com/in/marcosolazzi" target="_blank" rel="noopener noreferrer">in/marcosolazzi</a>
                        </ListItem>
                    </List>
                </div>
            </section>
        );
    }
}

export default Cover;