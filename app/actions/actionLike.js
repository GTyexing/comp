export const asyncLike = info => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/fav/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      ...info,
    }),
  });

export const asyncDisLike = info => dispatch =>
  fetch('http://lab.songt.me:8080/smartpaper/fav/', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      ...info,
    }),
  });
