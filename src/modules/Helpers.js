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
const commentCounter = (arr) => arr.childElementCount;

const removeBodyScroll = () => {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.classList.add('no-scroll');
  console.log(window.scrollY);
};

const addBodyScroll = () => {
  const scrollY = document.body.style.top;
  console.log(scrollY);
  document.body.classList.remove('no-scroll');
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
};

export {
  getLikesOf,
  getOnlyShows,
  getCount,
  commentCounter,
  removeBodyScroll,
  addBodyScroll,
};
