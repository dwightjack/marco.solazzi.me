import React from 'react';

const Caption = ({link, label = ''}) => (
    link ? <a href={link} target="_blank" rel="noopener noreferrer">{label.toString()}</a> : label.toString()
);

Caption.propTypes = {
    link: React.PropTypes.string,
    label: React.PropTypes.string
};

export default Caption;