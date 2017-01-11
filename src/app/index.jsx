import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './components/App';

const appElement = document.getElementById('app');

ReactDOM.render(
    <AppContainer>    
        <App />
    </AppContainer>,
    appElement
);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default; // eslint-disable-line global-require
        ReactDOM.render(
            <AppContainer>
               <NextApp />
            </AppContainer>,
            appElement
        );
    });
}
