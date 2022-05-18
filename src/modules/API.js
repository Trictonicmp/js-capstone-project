const movieURL = 'https://api.tvmaze.com/shows';
const endPoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const APP_ID = 'tRB9LWQF3akOeweiTUr4';

const getMovieById = async (id) => {
  const response = await fetch(`${movieURL}/${id}`);
  const data = await response.json();
  return data;
};

const newComment = async (movieId, user, userComment) => {
  const response = await fetch(`${endPoint}/${APP_ID}/comments/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: movieId,
      username: user,
      comment: userComment,
    }),
  });

  return response;
};

const getMovieComments = async (id) => {
  const response = await fetch(`${endPoint}/${APP_ID}/comments?item_id=${id}`);
  const data = await response.json();
  return data;
};

export { getMovieById, newComment, getMovieComments };