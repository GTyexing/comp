export const GET_HIS_LIST = 'GET_HIS_LIST';
export const GET_HIS_PAPER = 'GET_HIS_PAPER';

export const getHisList = details => ({
  type: GET_HIS_LIST,
  details,
});

export const getHisPaper = details => ({
  type: GET_HIS_PAPER,
  details,
});

export const asyncGetHisList = () => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/paper/subjects/1')
    .then(response => response.json())
    .then(json => dispatch(getHisList(json)));

export const asyncGetHisPaper = id => dispatch =>
  fetch(`http://lab.songt.me:8080/smartpaper/paper/${id}`)
    .then(response => response.json())
    .then(json => dispatch(getHisPaper(json)));
