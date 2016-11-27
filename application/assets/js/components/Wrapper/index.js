import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TimelineMax } from 'gsap';

import Router from '../../router';
import { createRefs, bindAll, noop } from '../../base/utils';

import './_wrapper.scss';

export default class Wrapper extends PureComponent {

    constructor(props) {
        super(props);

        createRefs(this, 'root');
        bindAll(this, 'onScroll', 'routerListener');
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

        this.bindRouter();
    }

    componentDidUpdate() {
        this.bindRouter();
    }

    onScroll(e) {
        const scrollTop = e.target.scrollTop;
        this.pages.some(({offsetTop, route}) => {
            if (offsetTop < scrollTop) {
                if (this.currentPage !== route) {
                    this.currentPage = route;
                    this.props.onPageChange(route, true);
                }
                return true;
            }
            return false;
        });
    }

    routerListener(nextRoute) {
        const page = document.querySelector(`[name="${nextRoute}"]`);
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

    bindRouter() {
        const { router, breakpoint } = this.props;
        if (breakpoint === 'tablet' || breakpoint === 'mobile') {
            router.listen(this.routerListener);
        } else {
            router.removeListener(this.routerListener);
        }
    }

    render() {

        const { children } = this.props;

        return (
            <main role="main" className="o-wrapper" ref={this.rootRef} onScroll={this.onScroll}>
                {children}
            </main>
        );
    }

}

Wrapper.propTypes = {
    children: React.PropTypes.node,
    route: React.PropTypes.string,
    breakpoint: React.PropTypes.string,
    onPageChange: React.PropTypes.func,
    router: React.PropTypes.instanceOf(Router)
};

Wrapper.defaultProps = {
    onPageChange: noop
};

const mapStateToProps = ({route, breakpoint}) => ({route, breakpoint});

export const connected = connect(
    mapStateToProps
)(Wrapper);