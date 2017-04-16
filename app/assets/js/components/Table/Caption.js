import React from 'react';

const Caption = ({link, label = ''}) => (
    link ? <a href={link} target="_blank" rel="noopener noreferrer">{label.toString()}</a> : <span>{label.toString()}</span>
);

Caption.propTypes = {
    link: React.PropTypes.string,
    label: React.PropTypes.string
};

export default Caption;