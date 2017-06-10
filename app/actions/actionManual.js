export const SEARCH_QUESTION_OPTIONAL = 'SEARCH_QUESTION_OPTIONAL';
export const MANUAL_MAKE_PAPER = 'MANUAL_MAKE_PAPER';

export const searchQuestionOptional = questions => ({
  type: SEARCH_QUESTION_OPTIONAL,
  questions,
});

export const manualMakePaper = details => ({
  type: MANUAL_MAKE_PAPER,
  details,
});

export const asyncSQO = (
  subject = 1,
  point = 0,
  diff = 0,
  type = 0,
) => dispatch =>
  fetch(
    `http://lab.songt.me:8080/smartpaper/questions/subjects/${subject}/points/${point}/difficulties/${diff}/types/${type}?page=0&size=15`,
    {
      method: 'GET',
    },
  )
    .then(response => response.json())
    .then(json => dispatch(searchQuestionOptional(json.content.slice(0, 25))));

export const asyncMMP = info => dispatch =>
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
    .then(json => dispatch(manualMakePaper(json)));
