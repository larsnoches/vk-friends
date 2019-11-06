import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { save, load } from 'redux-localstorage-simple';
import App from './components/app';
import FriendsReducer from './state/reducer';

const createStoreWithMiddleware = applyMiddleware(
  save({
    namespace: 'friendsApp',
    states: ['vkToken', 'userId'],
  }),
)(createStore);

const store = createStoreWithMiddleware(
  FriendsReducer,
  load({
    namespace: 'friendsApp',
    states: ['vkToken', 'userId'],
    preloadedState: {
      items: [],
      inProgress: false,
      vkToken: null,
      userId: null,
      userName: null,
    },
  }),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
