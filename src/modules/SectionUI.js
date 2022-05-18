import { getShows } from "./API.js";

const createCard = (show, likesCount) => {
  console.log(show);
  const card = document.createElement('li');
  card.classList.add('show');
  card.append(createLikeButton(likesCount));
  const cardImg = document.createElement('img');
  cardImg.alt = show.name;
  cardImg.src = show.image.medium;
  card.append(cardImg);
  card.append(createshowDetails(show));

  return card;
}

const createLikeButton = (likesCount) => {
  const likeButton = document.createElement('button');
  likeButton.type = 'button';
  const numberOfLikes = document.createElement('span');
  numberOfLikes.innerText = likesCount + ' likes';
  const likeIcon = document.createElement('i');
  likeIcon.classList.add(["fa-solid", "fa-heart", "liked"]);

  return likeButton;
}

const createshowDetails = (show) => {
  const showDetails = document.createElement('div');
  showDetails.classList.add('show-details');
  const title = document.createElement('h2');
  title.innerText = show.name;
  showDetails.append(title);
  const genresList = document.createElement('ul');
  for(let i = 0; i < show.genres.length; i += 1) {
    const genre = document.createElement('li');
    genre.innerText = show.genres[i];
    genresList.append(genre);
  }
  showDetails.append(genresList);

  const networkDetails = document.createElement('div');
  networkDetails.classList.add('network-details');
  
  const network = document.createElement('span');

  network.innerText = (show.network)? show.network.name : 'unkown';
  const boradcastIcon = document.createElement('i');
  boradcastIcon.classList.add("fa-solid");
  boradcastIcon.classList.add("fa-tower-broadcast");
  network.prepend(boradcastIcon);

  const country = document.createElement('span');
  country.innerText = (show.network)? show.network.country.code : 'unkown';
  const worldIcon = document.createElement('i');
  worldIcon.classList.add("fa-solid");
  worldIcon.classList.add("fa-earth-americas");
  country.prepend(worldIcon);  

  networkDetails.append(network);
  networkDetails.append(country);
  showDetails.append(networkDetails);

  const seeMoreBtn = document.createElement('button');
  seeMoreBtn.classList.add('see-more');
  seeMoreBtn.innerText = 'See more'

  showDetails.append(seeMoreBtn);
  return showDetails;
}

const displayShows = async () => {
  const showsContainer = document.getElementById('shows-container');
  const shows = await getShows(1, 9);
  for(let i = 0; i < shows.length; i += 1) {
    showsContainer.append(createCard(shows[i], 3));
  }
}

export { displayShows }