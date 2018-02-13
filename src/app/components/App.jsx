import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import configure from './store';
import Episodes from "./Episodes";
import EpisodeDetail from "./EpisodeDetail";

const store = configure();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/' component={Episodes}/>
            <Route path="/:id" component={EpisodeDetail}/>
          </div>
        </Router>
      </Provider>
    );
  }
};
