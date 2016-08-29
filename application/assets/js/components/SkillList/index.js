import React from 'react';

import Meter from '../Meter';
import './_skill-list.scss';

const SkillList = ({data}) => {
    const skillItems = data.map((skill, idx) => (
        <li key={skill.id} className="c-skill-list__item" style={{transitionDelay: (idx * 150) + 'ms'}}>
            {skill.level ? <Meter label={skill.label} value={skill.level} /> : skill.label}
        </li>
    ));
    return (<ul className="c-skill-list">{skillItems}</ul>);
};

SkillList.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default SkillList;