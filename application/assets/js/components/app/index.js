import React, {Component} from 'react';

import Page from '../../containers/page';
import Section from '../section';

export default class App extends Component {

    render() {

        return (
            <div className="c-pagelist">
                <Page id="job">
                    <Section title="jobs.current" />
                    <Section title="jobs.previous" />
                </Page>
            </div>
        );
    }

}

// App.propTypes = {
//     children: React.PropTypes.node
// };