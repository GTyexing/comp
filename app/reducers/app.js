import { GET_POINT, GET_QUESTION } from '../actions/actionPractice';
import { SEARCH_QUESTION_OPTIONAL } from '../actions/actionManual';

const app = (
  state = {
    points: [],
    diff: [],
    type: [],
    questions: [],
  },
  action,
) => {
  switch (action.type) {
    case GET_POINT:
      return {
        ...state,
        points: [...action.points.slice(0, 10)],
      };
    case GET_QUESTION:
      return {
        ...state,
        questions: [...action.questions],
      };
    case SEARCH_QUESTION_OPTIONAL:
      return {
        ...state,
        questions: [...action.questions],
      };
    default:
      return state;
  }
};

export default app;
