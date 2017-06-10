import { AUTO_STEP_ONE } from '../actions/actionAuto';
import { MANUAL_MAKE_PAPER } from '../actions/actionManual';
import { CHANGE_SCORE, CHANGE_SCORE_2 } from '../actions/actionPractice';
import { GET_HIS_PAPER } from '../actions/actionHistory';
import { GET_EXAM } from '../actions/actionExam';

const autoPaper = (
  state = {
    paperId: 0,
    subjectId: 1,
    title: null,
    totalScore: 0,
    userId: 1,
    paperTypesAndQuestions: [],
    paperQuestions: [],
    paperQuestions2: [],
  },
  action,
) => {
  switch (action.type) {
    case AUTO_STEP_ONE:
      return {
        ...state,
        paperTypesAndQuestions: action.questions.paperTypesAndQuestions,
        paperQuestions: action.questions.paperTypesAndQuestions[0]
          .paperQuestions,
        paperQuestions2: action.questions.paperTypesAndQuestions[1]
          .paperQuestions,
        paperId: action.questions.paperId,
      };
    case MANUAL_MAKE_PAPER:
      return {
        ...state,
        title: action.details.title,
        totalScore: action.details.totalScore,
        paperId: action.details.paperId,
        paperTypesAndQuestions: action.details.paperTypesAndQuestions,
        paperQuestions2: action.details.paperTypesAndQuestions[1]
          .paperQuestions,
        paperQuestions: action.details.paperTypesAndQuestions[0].paperQuestions,
      };
    case CHANGE_SCORE:
      return {
        ...state,
        paperTypesAndQuestions: [
          {
            ...state.paperTypesAndQuestions[0],
            paperQuestions: [
              ...state.paperTypesAndQuestions[0].paperQuestions.slice(
                0,
                action.details.i,
              ),
              {
                ...state.paperTypesAndQuestions[0].paperQuestions[
                  action.details.i
                ],
                questionScore: action.details.score,
              },
              ...state.paperTypesAndQuestions[0].paperQuestions.slice(
                action.details.i + 1,
              ),
            ],
          },
          state.paperTypesAndQuestions[1],
        ],
      };
    case CHANGE_SCORE_2:
      return {
        ...state,
        paperTypesAndQuestions: [
          state.paperTypesAndQuestions[0],
          {
            ...state.paperTypesAndQuestions[1],
            paperQuestions: [
              ...state.paperTypesAndQuestions[1].paperQuestions.slice(
                0,
                action.details.i,
              ),
              {
                ...state.paperTypesAndQuestions[1].paperQuestions[
                  action.details.i
                ],
                questionScore: action.details.score,
              },
              ...state.paperTypesAndQuestions[1].paperQuestions.slice(
                action.details.i + 1,
              ),
            ],
          },
        ],
      };
    case GET_HIS_PAPER:
      return {
        ...action.details,
        paperQuestions2: action.details.paperTypesAndQuestions[1]
          .paperQuestions,
        paperQuestions: action.details.paperTypesAndQuestions[0].paperQuestions,
      };
    case GET_EXAM:
      return {
        ...action.detail,
        paperQuestions2: action.detail.paperTypesAndQuestions[1].paperQuestions,
        paperQuestions: action.detail.paperTypesAndQuestions[0].paperQuestions,
      };
    default:
      return state;
  }
};

export default autoPaper;
