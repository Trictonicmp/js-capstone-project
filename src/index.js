import './style.css';
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