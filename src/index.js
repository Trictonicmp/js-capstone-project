import './style.css';
import ToDoList from './modules/todolist.js';
import Factory from './modules/factory.js';
import Interactivity from './modules/interactivity.js';

const deleteAllCompletebutton = document.getElementById('deleteAllComplete');

deleteAllCompletebutton.addEventListener('click', () => {
  Interactivity.DelelteAllComplete();
  /* eslint-disable */
  addEventListenerToInput();
  addEventListenerToButton();
  addEventListenerToDeleteButton();
  addEventListenerToCheckBox();
  /* eslint-enable */
});

const addEventListenerToInput = () => {
  const descriptionInputs = document.querySelectorAll('.input-descrption');
  descriptionInputs.forEach((item) => {
    item.addEventListener('input', () => {
      const index = item.id.slice(-item.id.length + 7);
      const description = item.value;
      Factory.editToDoListItem(index, description);
      /* eslint-disable */
      addEventListenerToButton();
      /* eslint-enable */
    });
  });
};

const addEventListenerToDeleteButton = () => {
  const deleteButton = document.querySelector('.deleteButton');
  if (deleteButton !== null) {
    deleteButton.addEventListener('click', () => {
      const index = deleteButton.id.slice(-deleteButton.id.length + 14);

      Factory.removeToDoLIstItem(index);
      addEventListenerToInput();
      /* eslint-disable */
      addEventListenerToButton();
      
      addEventListenerToCheckBox();
      /* eslint-enable */
      addEventListenerToDeleteButton();
    });
  }
};

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('add-input').value;
  const todolist = JSON.parse(localStorage.getItem('ToDoList'));
  let toDoListItem;
  if (todolist == null) {
    toDoListItem = new ToDoList(0, description, false);
  } else {
    toDoListItem = new ToDoList(todolist.length, description, false);
  }
  Factory.createToDoListItem(toDoListItem);
  /* eslint-disable */
  addEventListenerToButton();
  
  addEventListenerToInput();
  addEventListenerToCheckBox();
  /* eslint-enable */
});
const addEventListenerToButton = () => {
  const menuButtons = document.querySelectorAll('.menubutton');
  menuButtons.forEach((item) => {
    item.addEventListener('click', () => {
      const index = item.id.slice(-item.id.length + 2);

      Factory.AppendDeleteButton(index);
      addEventListenerToInput();
      addEventListenerToDeleteButton();
      addEventListenerToButton();
      /* eslint-disable */
      addEventListenerToCheckBox();
      /* eslint-enable */
    });
  });
};

window.onload = () => {
  addEventListenerToInput();
  addEventListenerToButton();
  addEventListenerToDeleteButton();
  /* eslint-disable */
  addEventListenerToCheckBox();
  /* eslint-enable */
};
const addEventListenerToCheckBox = () => {
  const completeCheckBox = document.querySelectorAll('.checkbox');
  completeCheckBox.forEach((item) => {
    const index = item.id.slice(-item.id.length + 7);
    item.addEventListener('change', () => {
      Interactivity.CompleteTask(index, item.checked);
      /* eslint-disable */
      addEventListenerToButton();
      addEventListenerToCheckBox();
      /* eslint-enable */
    });
  });
};

Factory.retrieveToDoList();
addEventListenerToButton();
addEventListenerToInput();
addEventListenerToDeleteButton();
addEventListenerToCheckBox();
