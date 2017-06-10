import { GET_HIS_LIST } from '../actions/actionHistory';

const history = (state = [], action) => {
  switch (action.type) {
    case GET_HIS_LIST:
      return [...action.details];
    default:
      return state;
  }
};

export default history;
