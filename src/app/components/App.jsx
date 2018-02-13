import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configure from './store';
import Episode from "./Episode";

const store = configure();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <Episode/>
            </Provider>
        );
    }
};
