import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import app from './app';
import autoPaper from './autoPaper';
import history from './history';
import examList from './examList';
import unsolveQuestion from './unsolveQuestion';
import teacher from './teacher';
import enhance from './enhance';

const rootReducer = combineReducers({
  app,
  autoPaper,
  history,
  examList,
  unsolveQuestion,
  teacher,
  enhance,
  routing: routerReducer,
});

export default rootReducer;
