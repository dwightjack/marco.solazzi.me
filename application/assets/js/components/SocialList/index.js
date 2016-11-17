import React from 'react';

import List, { ListItem } from '../../components/List';
import Ico from '../../components/Ico';
import social from '../../database/social.json';

const SocialList = () => (
    <List className="o-social-list">
        {social.map(({type, url, label}) => (
            <ListItem key={type}>
                <Ico name={type} /> <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
            </ListItem>
        ))}
    </List>
);

export default SocialList;
