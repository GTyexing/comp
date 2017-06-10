import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import Student from './container/Student';
import Login from './container/Login';
import Teacher from './container/Teacher';
import Practice from './container/Practice';
import OnlineTest from './container/OnlineTest';
import Report from './container/Report';
import Favorites from './container/Favorites';
import Unsolve from './container/Unsolve';
import Auto from './container/Auto';
import Info from './container/Info';
import Manual from './container/Manual';
import History from './container/History';
import Enhance from './container/Enhance';

import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Login} />
      <Route path="student" component={Student}>
        <IndexRoute component={Practice} />
        <Route path="test" component={OnlineTest} />
        <Route path="report" component={Report} />
        <Route path="unsolve" component={Unsolve} />
        <Route path="favorites" component={Favorites} />
        <Route path="enhance" component={Enhance} />
      </Route>
      <Route path="teacher" component={Teacher}>
        <IndexRoute component={Auto} />
        <Route path="manual" component={Manual} />
        <Route path="history" component={History} />
        <Route path="favorites" component={Favorites} />
        <Route path="info" component={Info} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('App'));
