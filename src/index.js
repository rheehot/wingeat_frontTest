import React from 'react';
// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'Redux/Reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

import ReactDOM from 'react-dom';
import Routes from './Routes';
import './Style/common.scss';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
