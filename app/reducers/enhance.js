import { GET_ENHANCE } from '../actions/actionExam';

const enhance = (state = [], action) => {
  switch (action.type) {
    case GET_ENHANCE:
      return [...action.details];
    default:
      return state;
  }
};

export default enhance;
