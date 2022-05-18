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

export { getShows };