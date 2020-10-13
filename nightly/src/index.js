import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducers from './Redux/Redux-reducer';

const {
  forwardToMain,
  replayActionRenderer,
  getInitialStateRenderer,
} = require('electron-redux');


const middleWare = (store) => (next) => (action) => {
  console.log('Renderer middleWare' + action);
  next(action);
};

const initialState = getInitialStateRenderer();

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(forwardToMain, middleWare)
);

store.subscribe(() => {
  console.log(store.getState());
});

replayActionRenderer(store);


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
