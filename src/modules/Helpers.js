const getLikesOf = (itemId, likesList) => {
  let numberOfLikes = 0;
  for (let i = 0; i < likesList.length; i += 1) {
    if (likesList[i].item_id === itemId) {
      numberOfLikes = likesList[i].likes;
      break;
    }
  }
  return numberOfLikes;
};

const getOnlyShows = (objectsArray) => {
  const shows = [];
  objectsArray.forEach((object) => {
    shows.push(object.show);
  });

  return shows;
};

const getCount = (listOfElements) => listOfElements.length;

export { getLikesOf, getOnlyShows, getCount };