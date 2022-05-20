import {
  getShowsByPage,
  getLikes,
  addLikeTo,
  getQueriedShows,
} from './API.js';

import {
  getLikesOf,
  getOnlyShows,
  getCount,
} from './Helpers.js';

import {
  ShowPopup,
  enableCloseDetailsPop,
} from './UI.js';

import noImage from '../images/no-image.svg';

const createLikeButton = (likesCount, showId) => {
  likesCount = parseInt(likesCount, 10) ? likesCount : 0;
  const likeButton = document.createElement('button');
  likeButton.type = 'button';
  likeButton.classList.add('like');
  const numberOfLikes = document.createElement('span');
  numberOfLikes.innerText = `${likesCount} likes`;
  const likeIcon = document.createElement('i');
  likeIcon.classList.add('fa-solid');
  likeIcon.classList.add('fa-heart');

  likeButton.append(numberOfLikes);
  likeButton.append(likeIcon);

  likeButton.onclick = async () => {
    const added = await addLikeTo(showId);
    if (added) {
      numberOfLikes.innerHTML = '';
      numberOfLikes.innerText = `${likesCount + 1} likes`;
      likeIcon.classList.add('liked');
      likeButton.disabled = true;
    }
  };

  return likeButton;
};

const createshowDetails = (show) => {
  const showDetails = document.createElement('div');
  showDetails.classList.add('show-details');
  const title = document.createElement('h3');
  title.innerText = show.name;
  showDetails.append(title);
  const genresList = document.createElement('ul');
  for (let i = 0; i < show.genres.length; i += 1) {
    const genre = document.createElement('li');
    genre.innerText = show.genres[i];
    genresList.append(genre);
  }
  showDetails.append(genresList);

  const networkDetails = document.createElement('div');
  networkDetails.classList.add('network-details');

  const network = document.createElement('span');

  network.innerText = (show.network) ? show.network.name : 'unkown';
  const boradcastIcon = document.createElement('i');
  boradcastIcon.classList.add('fa-solid');
  boradcastIcon.classList.add('fa-tower-broadcast');
  network.prepend(boradcastIcon);

  const country = document.createElement('span');
  country.innerText = (show.network) ? show.network.country.code : 'unkown';
  const worldIcon = document.createElement('i');
  worldIcon.classList.add('fa-solid');
  worldIcon.classList.add('fa-earth-americas');
  country.prepend(worldIcon);

  networkDetails.append(network);
  networkDetails.append(country);
  showDetails.append(networkDetails);

  const seeMoreBtn = document.createElement('button');
  seeMoreBtn.classList.add('see-more');
  seeMoreBtn.type = 'button';
  seeMoreBtn.innerText = 'See more';

  seeMoreBtn.onclick = async () => {
    await ShowPopup(show.id);
    await enableCloseDetailsPop();
  };

  showDetails.append(seeMoreBtn);
  return showDetails;
};

const createCard = (show, likesCount) => {
  const card = document.createElement('li');
  card.classList.add('show');
  card.append(createLikeButton(likesCount, show.id));
  const cardImg = document.createElement('img');
  cardImg.alt = show.name;
  cardImg.src = show.image ? show.image.medium : noImage;
  card.append(cardImg);
  card.append(createshowDetails(show));

  return card;
};

const setItemsCount = (count) => {
  document.getElementById('items-counter').innerText = count;
};

const displayShows = async (shows) => {
  const showsContainer = document.getElementById('shows-container');
  showsContainer.innerHTML = '';
  const likesList = await getLikes();
  setItemsCount(getCount(shows));
  for (let i = 0; i < shows.length; i += 1) {
    const likesCount = getLikesOf(shows[i].id, likesList);
    showsContainer.append(createCard(shows[i], likesCount));
  }
};

const displayHome = async () => {
  const shows = await getShowsByPage(1, 30);
  displayShows(shows);
};

const displayAction = async () => {
  const objectsArray = await getQueriedShows('action', 30);
  const shows = getOnlyShows(objectsArray);
  displayShows(shows);
};

const displayKids = async () => {
  const objectsArray = await getQueriedShows('kids', 30);
  const shows = getOnlyShows(objectsArray);
  displayShows(shows);
};

export { displayHome, displayAction, displayKids };
