import './style.css';
import {ShowPopup,CloseModal,enableCloseDetailsPop} from './modules/UI.js'

const showDetailsButton= document.querySelector('#showDetailsButton');

showDetailsButton.addEventListener('click', async()=>{
    await ShowPopup(4);
    await enableCloseDetailsPop();
});

