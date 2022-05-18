import './style.css';
import { ShowPopup, enableCloseDetailsPop } from './modules/UI.js';
import displayShows from './modules/SectionUI.js';

const showDetailsButton = document.querySelector('#showDetailsButton');

showDetailsButton.addEventListener('click', async () => {
  await ShowPopup(10);
  await enableCloseDetailsPop();
});

displayShows();
