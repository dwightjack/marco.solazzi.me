import React, { Component } from 'react';
import { TweenMax, Power2, TimelineMax } from 'gsap';
import classnames from 'classnames';

import './_cover.scss';

import { createRefs } from '../../base/utils';
import Table from '../../components/Table';
import List, { ListItem } from '../../components/List';
import Avatar from '../../components/Avatar';
import Ico from '../../components/Ico';
import pic from '../../../images/marco.jpg';
import social from '../../database/social.json';

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

        createRefs(this, 'root', 'avatar', 'title', 'table', 'footer');
    }

    componentWillLeave(callback) {
        const tl = this.tl = new TimelineMax();

        this.avatar.classList.add('is-leaving');

        tl.to(this.avatar, 0.2, {
            autoAlpha: 0,
            ease: Power2.easeInOut
        })
        .to(this.title, 0.5, {
            yPercent: -300,
            autoAlpha: 0,
            ease: Power2.easeInOut
        }, '+=0.35')
        .to(this.table, 0.5, {
            yPercent: -200,
            autoAlpha: 0,
            ease: Power2.easeInOut
        }, '-=0.3')

        .to(this.footer, 0.5, {
            yPercent: -200,
            autoAlpha: 0,
            ease: Power2.easeInOut
        }, '-=0.3')
        .to(this.root, 0.7, {
            yPercent: -100,
            ease: Power2.easeInOut,
            onComplete: () => {
                callback();
            }
        });

    }

    componentDidUnMount() {
        this.tl = null;
    }

    componentWillEnter(callback) {
        if (this.tl) {
            this.tl.pause(0, true); // Go back to the start (true is to suppress events)
            this.tl.remove();
        }
        TweenMax.fromTo(this.root, 0.8, {
            yPercent: -100
        }, {
            yPercent: 0,
            ease: Power2.easeOut,
            clearProps: 'all',
            onComplete: callback
        });
    }

    render() {

        const {active} = this.props;

        return (
            <section className={classnames('c-cover', {'is-active': active})} ref={this.rootRef}>

                <div className="c-cover__pic" ref={this.avatarRef}>
                    <Avatar src={pic} />
                </div>
                <div className="c-cover__body">

                    <h2 className="c-cover__headline" ref={this.titleRef}>こんにちわ！</h2>
                    <article ref={this.tableRef}>
                        <Table
                            data={data}
                        />
                    </article>
                    <footer ref={this.footerRef}>
                        <List>
                            {social.map(({type, url, label}) => (
                                <ListItem key={type}>
                                    <Ico name={type} /> <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
                                </ListItem>
                            ))}
                        </List>
                    </footer>
                </div>
            </section>
        );
    }
}

Cover.propTypes = {
    active: React.PropTypes.bool
};

Cover.defaultProps = {
    active: false
};

export default Cover;