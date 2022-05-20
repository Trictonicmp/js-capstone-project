import { getMovieById, newComment, getMovieComments } from './API.js';
import { addBodyScroll, commentCounter, removeBodyScroll } from './Helpers.js';
import noImage from '../images/no-image.svg';

const backgroundModal = document.createElement('div');
const modal = document.createElement('div');
const main = document.querySelector('#main');
let popupOpenFlag = false;

const CloseModal = () => {
  if (backgroundModal) {
    backgroundModal.remove();
  }
  if (modal) {
    modal.remove();
  }
};

const displayComments = async (id) => {
  const reponse = await getMovieComments(id);
  const commentListDiv = document.querySelector('.comment-list-items');
  commentListDiv.innerHTML = '';
  if (reponse.error) {
    commentListDiv.innerHTML = '<span class="no-comments">There are no comments yet! <br>Be the first to comment<span>';
  } else {
    reponse.forEach((element) => {
      commentListDiv.innerHTML += `
              <div class="user-comment"><span>${element.username}</span><span>on ${element.creation_date}</span><p> ${element.comment}</p></div>`;
    });
  }
  await commentCounter(reponse);
};

const ShowPopup = async (id) => {
  removeBodyScroll();
  const movie = await getMovieById(id);
  const image = movie.image ? movie.image.original : noImage;
  modal.classList.add('modal-container');
  console.log(movie.summary);
  modal.innerHTML = `
  <article class="modal modal-fade">
    <div class="popup-close" id="closeDetailsPop">
      <i class="fa-solid fa-xmark"></i>
    </div>
    <div class="popup-image-description">
      <img class="movie-image" src="${image}" alt="${movie.name}">
      <div class="popup-details">
        <div class="summary">    
          <h2 class="summary-headline">${movie.name}</h2>
          <div class="summary-container">
            <p>${movie.summary}</p>
          </div>
          <div class="movie-metadata">
            <div class="metadata-row">
              <span class="metadata-item"><i class="fa-solid fa-language"></i> ${movie.language}</span> <span class="metadata-item"><i class="fa-solid fa-stopwatch"></i> ${movie.averageRuntime} Minutes</span>
            </div>
            <div class="metadata-row">
              <span class="metadata-item"><i class="fa-solid fa-star"></i> ${movie.rating.average}</span> <span class="metadata-item"><i class="fa-solid fa-calendar-days"></i> ${movie.premiered}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comments">
      <div class="comment-form">
        <h2 class="comment-form-headline">Add a Comment</h2>
        <form id="form" class="form">
          <input type="text" required class="input-name" id="userName" placeholder="Your Name">
          <textarea name="commnet" required id="commnent" class="input-comment" placeholder="Your insights"></textarea>
          <button type="submit" class="comment-button">Comment</button>
        </form>
      </div>
      <div class="comment-list">
        <h2 class="list-comment-headline"></h2>
        <div class="comment-list-items">
        </div>
      </div>
    </div>
  </article>
  `;
  backgroundModal.classList.add('background-popup');
  main.appendChild(backgroundModal);
  backgroundModal.appendChild(modal);
  popupOpenFlag = true;
  await displayComments(id);

  const commentCountHL = document.querySelector('.list-comment-headline');
  const movieComments = await getMovieComments(id);
  if (movieComments.error) {
    commentCountHL.innerHTML = 'Comments (0)';
  } else {
    const commentDivs = document.querySelector('.comment-list-items');
    const commentCount = commentCounter(commentDivs);
    commentCountHL.innerHTML = `Comments (${commentCount})`;
  }
  const formComment = document.querySelector('#form');
  formComment.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const comment = document.getElementById('commnent').value;
    await newComment(id, userName, comment);
    const movieComments = await getMovieComments(id);
    formComment.reset();
    await displayComments(id);
    if (movieComments.error) {
      commentCountHL.innerHTML = 'Comments (0)';
    } else {
      const commentDivs = document.querySelector('.comment-list-items');
      const commentCount = commentCounter(commentDivs);
      commentCountHL.innerHTML = `Comments (${commentCount})`;
    }
  });
};

const enableCloseDetailsPop = () => {
  if (popupOpenFlag) {
    const closeDetailsPop = document.querySelector('#closeDetailsPop');
    closeDetailsPop.addEventListener('click', () => {
      CloseModal();
      addBodyScroll();
    });
  }
};

export {
  ShowPopup, CloseModal, enableCloseDetailsPop, commentCounter,
};