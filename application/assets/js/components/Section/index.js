import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindAll, createRefs } from '../../base/utils';
import Title from '../Title';

import './_section.scss';

class Section extends PureComponent {

    constructor(props) {
        super(props);

        this.offsetTop = 0;
        this.maxScroll = 0;
        this.state = {
            inView: false,
            scrollAmount: false,
            atBottom: false
        };
        createRefs(this, 'root');
    }

    componentDidMount() {
        const root = this.root;
        this.title = root.querySelector('.c-section__title');

        //wait just nothing for the layout to render
        setTimeout(() => {
            const offset = parseInt(window.innerHeight * 0.01, 10);
            const rect = this.title.getBoundingClientRect();
            this.offsetTop = rect.top - offset - rect.height;
            this.rootOffsetTop = root.offsetTop;
            this.maxScroll = root.offsetTop + root.offsetHeight - rect.height - offset;
            this.setTitlePosition();
        }, 100);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pagelistScroll !== nextProps.pagelistScroll) {
            this.setTitlePosition();
        }
    }

    setTitlePosition() {
        const scroll = this.props.pagelistScroll;
        const scrollDiff = this.offsetTop - scroll;
        const scrollAmount = this.rootOffsetTop + parseInt(window.innerHeight * 0.2, 10) - (scroll + (window.innerHeight / 2));

        if (scrollDiff <= 0) {
            if (scroll < this.maxScroll) {
                this.setState({inView: true, atBottom: false, scrollAmount});
            } else {
                this.setState({inView: false, atBottom: true, scrollAmount});
            }

        } else {
            this.setState({inView: false, atBottom: false, scrollAmount});
        }
    }

    render() {
        const {children, title, subtitle, prefix} = this.props;
        const {scrollAmount} = this.state;
        const style = {transform: `translateY(${scrollAmount * 0.1}px)`};

        return (
            <section className="c-section" ref={this.rootRef}>
                <Title className="c-section__title" prefix={prefix} title={title} subtitle={subtitle} />
                <div className="c-section__body" style={style}>
                    {children}
                </div>
            </section>
        );
    }
}

Section.propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
    prefix: React.PropTypes.string,
    pagelistScroll: React.PropTypes.number
};

const mapStateToProps = (state) => ({pagelistScroll: state.pagelistScroll});

export default connect(
    mapStateToProps,
    null
)(Section);
