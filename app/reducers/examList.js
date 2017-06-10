import { GET_EXAM_LIST } from '../actions/actionExam';

const examList = (state = [], action) => {
  switch (action.type) {
    case GET_EXAM_LIST:
      return [...action.details];
    default:
      return state;
  }
};

export default examList;
