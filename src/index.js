import './style.css';
import { ShowPopup, enableCloseDetailsPop } from './modules/UI.js';
import { displayHome, displayAction, displayKids } from './modules/SectionUI.js';

window.onload = () => {
  displayHome();
  document.getElementById('nav-home').onclick = () => {
    displayHome();
  };
  document.getElementById('nav-action').onclick = () => {
    displayAction();
  };
  document.getElementById('nav-kids').onclick = () => {
    displayKids();
  };
};