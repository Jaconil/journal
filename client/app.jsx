'use strict';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './store';
import App from './components/App/app.jsx';

const store = createStore();

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.querySelector('#app'));
