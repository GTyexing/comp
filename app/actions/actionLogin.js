import { browserHistory } from 'react-router';

export const asyncLogin = username => dispatch =>
  (username === 'teacher'
    ? browserHistory.push('/teacher')
    : browserHistory.push('/student'));
