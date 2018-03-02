import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const appElement = document.getElementById('app');

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  appElement
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      appElement
    );
  });
}
