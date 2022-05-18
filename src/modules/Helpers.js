const getLikedOf = (itemId, likesList) => {
  for (let i = 0; i < likesList.length; i += 1) {
    if (likesList[i].item_id === itemId) {
      return likesList[i].likes;
    }
  }
  return 0;
};

export default getLikedOf;