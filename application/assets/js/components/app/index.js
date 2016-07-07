import React, {Component} from 'react';

import Page from '../../containers/page';
import PageList from '../pagelist';
import Section from '../section';

export default class App extends Component {

    render() {

        return (
            <PageList>
                <Page id="job">
                    <Section title="jobs.current" />
                    <Section title="jobs.previous" />
                </Page>
            </PageList>
        );
    }

}

// App.propTypes = {
//     children: React.PropTypes.node
// };