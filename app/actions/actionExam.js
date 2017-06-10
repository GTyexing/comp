export const GET_EXAM = 'GET_EXAM';
export const GET_EXAM_LIST = 'GET_EXAM_LIST';
export const GET_UNSOLVE_QUESTION = 'GET_UNSOLVE_QUESTION';
export const GET_EXAM_FOR_TEACHER = 'GET_EXAM_FOR_TEACHER';
export const GET_ENHANCE = 'GET_ENHANCE';

export const getExam = detail => ({
  type: GET_EXAM,
  detail,
});

export const getExamList = details => ({
  type: GET_EXAM_LIST,
  details,
});

export const getUnsolveQuestion = details => ({
  type: GET_UNSOLVE_QUESTION,
  details,
});

export const getExamForteacher = details => ({
  type: GET_EXAM_FOR_TEACHER,
  details,
});

export const getEnhance = details => ({
  type: GET_ENHANCE,
  details,
});

export const asyncGetExam = () => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/exam/studentId/1')
    .then(response => response.json())
    .then((json) => {
      dispatch(getExam(json[json.length - 1].examPaper));
    });

export const asyncGetReport = () => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/exam/1/student/1/report')
    .then(response => reponse.json())
    .then(json => dispatch(getExam(json.reportPaper)));

export const asyncGetExamList = () => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/exam/student/1/report')
    .then(response => response.json())
    .then(json => dispatch(getExamList(json)));

export const asyncGetUnsolveQuestion = () => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/wa/student/1')
    .then(response => response.json())
    .then(json => dispatch(getUnsolveQuestion(json)));

export const asyncGetExamForteacher = () => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/exam/report')
    .then(response => response.json())
    .then(json => dispatch(getExamForteacher(json)));

export const asyncGetEnhance = () => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/practice/student/1')
    .then(response => response.json())
    .then(json => dispatch(getEnhance(json)));
