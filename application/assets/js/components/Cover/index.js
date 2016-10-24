import React, { Component } from 'react';
import { TweenMax } from 'gsap';
import ReactTransitionGroup from 'react-addons-transition-group';

import './_cover.scss';

import Table from '../Table';
import List, { ListItem } from '../List';
import Avatar from '../Avatar';
import Ico from '../Ico';
import pic from '../../../images/marco.jpg';


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
);

class CoverIntro extends Component {

    constructor(props) {
        super(props);

        this.getRootNode = this.getRootNode.bind(this);
    }

    getRootNode(el) {
        this.rootEl = el;
    }

    componentWillAppear(done) {


        TweenMax.set(this.rootEl, {
            autoApha: 0
        });
        console.log(this.rootEl);
        done();
    }

    render() {
        return (
            <header className="c-cover__intro h1" ref={this.getRootNode}>
                <span>Geeks.query(</span>
                <span>    '/usr/<mark>marco+solazzi</mark>',</span>
                <span>    'job=<mark>frontend</mark>'</span>
                <span>).then((me) => ...</span>
            </header>
        );
    }
}

class CoverBody extends Component {

    render() {
        return (
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
        );
    }
}

class Cover extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 'intro'
        };
    }

    componentDidMount() {
        /*setTimeout(() => {
            this.setState({step: 'body'});
        }, 5000);*/
    }

    render() {
        return (
            <ReactTransitionGroup
                component="div"
                className="c-cover"
            >
                {this.state.step === 'intro' ? <CoverIntro /> : <CoverBody />}
            </ReactTransitionGroup>
        );
    }

}

export default Cover;