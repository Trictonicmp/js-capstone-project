const getLikesOf = (itemId, likesList) => {
  for(let i = 0; i < likesList.length; i += 1) {
    if(likesList[i].item_id === itemId) {
      return likesList[i].likes;
    }
  }
}

const getOnlyShows = (objectsArray) => {
  const shows = [];
  objectsArray.forEach((object) => {
    shows.push(object.show);
  })

  return shows;
}

const getCount = (listOfElements) => {
  return listOfElements.length;
} 

export { getLikesOf, getOnlyShows, getCount }