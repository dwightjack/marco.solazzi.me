import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from '../App';

export default class Root extends Component {
    render() {
        const { store, router } = this.props; //eslint-disable-line react/prop-types

        return (
            <Provider store={store}>
                <App router={router} />
            </Provider>
        );
    }
}