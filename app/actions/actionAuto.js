export const AUTO_STEP_ONE = 'AUTO_STEP_ONE';
export const AUTO_STEP_TWO = 'AUTO_STEP_TWO';
export const MAKE_EXAM = 'MAKE_EXAM';

export const autoStepOne = questions => ({
  type: AUTO_STEP_ONE,
  questions,
});

export const autoStepTwo = questions => ({
  type: AUTO_STEP_TWO,
  questions,
});

export const asyncASO = details => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/paper/smart/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      ...details,
    }),
  })
    .then(response => response.json())
    .then(json => dispatch(autoStepOne(json.paper)));

export const asyncMakeExam = details => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/exam/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: `paperId=${details.paperId}&examName=${details.examName}&endTime=${details.endTime}&startTime=${details.startTime}`,
  });

export const asyncAST = info => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/paper/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      ...info,
    }),
  })
    .then(response => response.json())
    .then(json => dispatch(asyncMakeExam({ ...info, paperId: json.paperId })));
