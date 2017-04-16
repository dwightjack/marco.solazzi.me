import React, { Component } from 'react';
import classnames from 'classnames';

import './_avatar.scss';

let clipId = 0;

class Avatar extends Component {


    constructor(props) {
        super(props);

        clipId += 1;

        this.clipId = `profile-clip-path${clipId}`;

        this.state = {
            loadStatus: 'pending',
            srcMeta: {}
        };
    }

    componentDidMount() {
        const {src} = this.props;

        const img = new Image();

        img.onload = () => {
            const {width, height} = img;
            this.setState({
                loadStatus: 'loaded',
                srcMeta: { width, height }
            });
        };

        img.onerror = () => {
            this.setState({loadStatus: 'error'});
        };

        img.src = src;

    }

    render() {

        const {src, className} = this.props;
        const {srcMeta, loadStatus} = this.state;

        const image = loadStatus === 'loaded' ?
            <image className="o-avatar__img" xlinkHref={src} x="0" y="0" width={srcMeta.width} height={srcMeta.height} /> :
            null;


        return (
            <figure className={classnames(className, `o-avatar is-${loadStatus}`)}>
                <svg viewBox="0 0 890 890" role="group">
                    <title>My picture in Japan</title>
                    <g clipPath={`url(#${this.clipId})`}>
                        {image}
                    </g>
                    <clipPath id={this.clipId} className="o-avatar__clip">
                        <path d="M850 425L725.5 725.5 425 850 124.5 725.5 0 425l124.5-300.5L425 0l300.5 124.5z" />
                    </clipPath>
                </svg>
                <svg viewBox="0 0 890 890" className="o-avatar__shadow" aria-hidden="true">
                    <path d="M850 425L725.5 725.5 425 850 124.5 725.5 0 425l124.5-300.5L425 0l300.5 124.5z" />
                </svg>
            </figure>
        );
    }
}


Avatar.propTypes = {
    src: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
};

export default Avatar;
