import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import counterReducer from './store/reducer';
import App from './App';

const store = createStore(counterReducer);

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

renderApp();

store.subscribe(renderApp);
