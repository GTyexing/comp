export const GET_POINT = 'GET_POINT';
export const GET_QUESTION = 'GET_QUESTION';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const CHANGE_SCORE_2 = 'CHANGE_SCORE_2';

function get() {
  return Math.random();
}

export const changeScore = details => ({
  type: CHANGE_SCORE,
  details,
});

export const changeScore2 = details => ({
  type: CHANGE_SCORE_2,
  details,
});

export const getPoint = points => ({
  type: GET_POINT,
  points,
});

export const getQuestion = questions => ({
  type: GET_QUESTION,
  questions,
});

export const asyncGetPoint = () => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/points/', {
    method: 'GET',
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(getPoint(json));
    });

export const asyncGetQuestion = () => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/questions?page=1&size=15')
    .then(response => response.json())
    .then((json) => {
      const num = Math.floor(get() * 600);
      dispatch(getQuestion(json.content.slice(num, num + 15)));
    });

export const asyncSubmitAnswer = info => dispatch =>
  fetch(
    `http://lab.songt.me:8080/smartpaper/exam/studentId/1/${info.paperId}?answerJson=${info.answerJson}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    },
  );
