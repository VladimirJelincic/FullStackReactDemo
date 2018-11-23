import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import Main from './components/Main';

import reducers from './reducers/reducerIndex';
const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Main} />
        {/* <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/users" component={Feature} />
        <Route path="/signout" component={Signout} /> */}
      </App>
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
