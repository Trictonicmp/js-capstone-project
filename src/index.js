import './style.css';
import { ShowPopup, enableCloseDetailsPop } from './modules/UI.js';

const showDetailsButton = document.querySelector('#showDetailsButton');

showDetailsButton.addEventListener('click', async () => {
  await ShowPopup(19);
  await enableCloseDetailsPop();
});
import { displayHome, displayAction, displayKids } from './modules/SectionUI.js';

window.onload = () => {
  displayHome();
  document.getElementById('nav-home').onclick = () => {
    displayHome();
  }
  document.getElementById('nav-action').onclick = () => {
    displayAction();
  }
  document.getElementById('nav-kids').onclick = () => {
    displayKids();
  }
}