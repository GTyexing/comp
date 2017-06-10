import { GET_UNSOLVE_QUESTION } from '../actions/actionExam';

const unsolveQuestion = (state = [], action) => {
  switch (action.type) {
    case GET_UNSOLVE_QUESTION:
      return [...action.details];
    default:
      return state;
  }
};

export default unsolveQuestion;
