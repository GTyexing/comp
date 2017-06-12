import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import Login from './container/Login';
import Student from './container/Student';
import Teacher from './container/Teacher';
import Practice from './container/student/Practice';
import OnlineTest from './container/student/OnlineTest';
import Report from './container/student/Report';
import Unsolve from './container/student/Unsolve';
import Enhance from './container/student/Enhance';
import Auto from './container/teacher/Auto';
import Info from './container/teacher/Info';
import Manual from './container/teacher/Manual';
import History from './container/teacher/History';
import Favorites from './container/Favorites';

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
        <Route path="enhance" component={Enhance} />
      </Route>
      <Route path="teacher" component={Teacher}>
        <IndexRoute component={Auto} />
        <Route path="manual" component={Manual} />
        <Route path="history" component={History} />
        <Route path="info" component={Info} />
      </Route>
      <Route path="favorites" component={Favorites} />
    </Router>

  </Provider>
);

render(router, document.getElementById('App'));
