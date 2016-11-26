import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TimelineMax } from 'gsap';

import { createRefs, bindAll, noop } from '../../base/utils';

import './_wrapper.scss';

export default class Wrapper extends PureComponent {

    constructor(props) {
        super(props);

        createRefs(this, 'root');
        bindAll(this, 'onScroll');
        this.pages = [];
        this.currentPage = '';

    }

    componentDidMount() {
        const pages = Array.from(document.querySelectorAll('[name^="#!"]'));
        const windowHeightOffset = parseInt(window.innerHeight * 0.25, 10);

        this.currentPage = this.props.route;

        this.pages = pages.map((el) => { //eslint-disable-line arrow-body-style
            return {
                offsetTop: el.offsetTop - windowHeightOffset,
                route: el.getAttribute('name'),
                el
            };
        }).reverse();
    }

    /*componentDidUpdate(prevProps) {
        if (prevProps.route !== this.props.route) {
            //get the element...
            const page = document.querySelector(`[name="${this.props.route}"]`);
            if (page) {
                const tl = new TimelineMax();

                tl.to(this.root, 0.3, {
                    opacity: 0
                })
                .add(() => page.scrollIntoView())
                .to(this.root, 0.3, {
                    opacity: 1,
                    delay: 0.2
                });
            }
        }
    }*/

    onScroll(e) {
        const scrollTop = e.target.scrollTop;
        this.pages.some(({offsetTop, route}) => {
            if (offsetTop < scrollTop) {
                if (this.currentPage !== route) {
                    this.currentPage = route;
                    this.props.onPageChange(route);
                }
                return true;
            }
            return false;
        });
    }

    render() {

        const { children } = this.props;

        return (
            <div className="o-wrapper" ref={this.rootRef}>
                {children}
            </div>
        );
    }

}

Wrapper.propTypes = {
    children: React.PropTypes.node,
    route: React.PropTypes.string,
    onPageChange: React.PropTypes.func
};

Wrapper.defaultProps = {
    onPageChange: noop
};

const mapStateToProps = ({route}) => ({route});

export const connected = connect(
    mapStateToProps
)(Wrapper);