import { browserHistory } from 'react-router';

export const asyncLogin = username => dispatch =>
  (username === 'teacher'
    ? (sessionStorage.setItem('username', 'teacher'), browserHistory.push(
        '/teacher',
      ))
    : (sessionStorage.setItem('username', 'student'), browserHistory.push(
        '/student',
      )));
