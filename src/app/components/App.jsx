import React, { Component, PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configure from './store';

const store = configure();

class Yolo extends Component {
    render() {
        return(<h1>Hello World  !!</h1>);
    }
};

class Swag extends Component {
    render() {
        return (
            <div>
                <h1>Conjecture</h1>
                <p>
                    Supposition fondée sur des probabilités, mais qui n'est pas contrôlée
                    par les faits ; présomption, hypothèse : On est réduit à des conjectures sur ses motivations.
                </p>
            </div>
        );
    }
};

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                  <div>
                    <Route path="/" component={Yolo}>
                    </Route>
                    <Route path="/new" component={Swag}>
                    </Route>
                  </div>
                </Router>
            </Provider>
        );
    }
};
