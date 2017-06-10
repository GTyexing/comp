import { GET_EXAM_FOR_TEACHER } from '../actions/actionExam';

const teacher = (state = [], action) => {
  switch (action.type) {
    case GET_EXAM_FOR_TEACHER:
      return [...action.details];
    default:
      return state;
  }
};

export default teacher;
