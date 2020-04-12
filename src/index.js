import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'Redux/Reducers/rootReducer';

import Routes from './Routes';
import './Style/common.scss';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
