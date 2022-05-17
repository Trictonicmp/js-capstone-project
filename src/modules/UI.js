import {getMovieById,newComment,getMovieComments} from './API.js'


const backgroundModal = document.createElement('div');
const modal = document.createElement('div');
const main = document.querySelector('#main');
let popupOpenFlag = false;
const ShowPopup= async (id)=> {
  
  const movie = await getMovieById(id);
  modal.classList.add('modal-container');
  modal.innerHTML = `
  <article class="modal">
    <div class="popup-close" id="closeDetailsPop">
    <i class="fa-solid fa-xmark"></i>
    </div>
    <div class="popup-image-description">
        <div class="popup-img">
        <img class="movie-image" src="${movie.image.medium}" alt="">
        </div>
        <div class="popup-details">
            <div class="summary">
            <h2 class="summary-headline">${movie.name}</h2>
            <p>${movie.summary}</p>
            </div>
            <div class="movie-metadata">
                <div class="language-daration">
                <span class="language">Language: ${movie.language}</span> <span class="runtime">Runtime: ${movie.averageRuntime} Minutes</span>
                </div>
                <div class="rating-premiered">
                <span class="rating">Rating: ${movie.rating.average}</span> <span class="premiered">Premiered: ${movie.premiered}</span>
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
            <h2 class="list-comment-headline">Comments</h2>
            <div class="comment-list-items">
            </div>
        </div>
        
        
    </div>
  </article>
  `;
  backgroundModal.classList.add('background-popup');
  main.appendChild(backgroundModal);
  backgroundModal.appendChild(modal);
  popupOpenFlag=true;
  await displayComments(id);
  const formComment = document.querySelector('#form');
  formComment.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const userName = document.getElementById('userName').value;
    const comment = document.getElementById('commnent').value;
    await newComment(id,userName,comment);
    formComment.reset();
    await displayComments(id);
  });
}

const displayComments = async(id) =>{
    const reponse = await getMovieComments(id);
    const commentListDiv = document.querySelector('.comment-list-items');
    commentListDiv.innerHTML='';
    if(reponse.error){
        commentListDiv.innerHTML='Be the first to comment';
    }else{
        reponse.forEach(element => {
            commentListDiv.innerHTML+=`
            <div><span>${element.creation_date}</span><span> ${element.username}: ${element.comment}</span></div>
            `;
        });
    }
    
}
 const enableCloseDetailsPop = ()=>{
     console.log(popupOpenFlag);
    if (popupOpenFlag) {
        const closeDetailsPop = document.querySelector('#closeDetailsPop');
        closeDetailsPop.addEventListener('click', ()=>{
            CloseModal();
        });        
    }
}

const CloseModal=()=> {
  if (backgroundModal) {
    backgroundModal.remove();
  }
  if (modal) {
    modal.remove();
  }
}

export {ShowPopup,CloseModal,enableCloseDetailsPop}