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

const getShowsByPage = async (pageNumber, showsQuantity) => {
  const returnShows = [];
  try {
    const response = await fetch(`https://api.tvmaze.com/shows?page=1${pageNumber}`);
    const shows = await response.json();
    for (let i = 0; i < showsQuantity; i += 1) {
      returnShows.push(shows[i]);
    }
  } catch (error) {
    console.log(error);
  }
  return returnShows;
};

const getQueriedShows = async (query, showsQuantity) => {
  const returnShows = [];
  try{
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const shows = await response.json();
    showsQuantity = (shows.length < showsQuantity)? shows.length : showsQuantity;
    for (let i = 0; i < showsQuantity; i += 1) {
      returnShows.push(shows[i]);
    }
  }
  catch(error) {
    console.log(error);
  }

  return returnShows;
}

const getLikes = async () => {
  const response = await fetch(`${endPoint}/${APP_ID}/likes/`);
  const likesList = await response.json();
  return likesList;
};

const addLikeTo = async (itemId) => {
  try {
    const response = await fetch(`${endPoint}/${APP_ID}/likes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id: itemId }),
    });
    return response;
  } catch (error) {
    return false;
  }
};

export {
  getShowsByPage, getLikes, addLikeTo, getMovieById, newComment, getMovieComments, getQueriedShows
};
