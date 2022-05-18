const endPoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const APP_ID = 'tRB9LWQF3akOeweiTUr4';

const getShows = async (pageNumber, showsQuantity) => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows?page=1${pageNumber}`);
    const shows = await response.json(); 
    const returnShows = [];
    for(let i = 0; i < showsQuantity; i += 1) {
      returnShows.push(shows[i]);
    }
    return returnShows;
  } catch (error) {
    console.log('error ' + error)
  }
}

const getLikes = async () => {
  const response = await fetch(`${endPoint}/${APP_ID}/likes/`)
  const likesList = await response.json();
  return likesList;
}

const addLikeTo = async (itemId) => {
  try {
    const response = await fetch(`${endPoint}/${APP_ID}/likes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "item_id": itemId }),
    });
    return true;
  }
  catch(error) {
    return false;
  }
}

export { getShows, getLikes, addLikeTo };