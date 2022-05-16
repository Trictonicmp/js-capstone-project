import Factory from './factory.js';

export default class Interactivity {
    static CompleteTask = (index, complete) => {
      const todolist = JSON.parse(localStorage.getItem('ToDoList'));
      for (let j = 0; j < todolist.length; j += 1) {
        if (index == j) {
          todolist[j].Complete = complete;
        }
      }
      localStorage.setItem('ToDoList', JSON.stringify(todolist));
      Factory.retrieveToDoList();
    }

    static DelelteAllComplete = () => {
      const todolist = JSON.parse(localStorage.getItem('ToDoList'));

      const todolistFiltered = todolist.filter((task) => task.Complete != true);

      localStorage.setItem('ToDoList', JSON.stringify(todolistFiltered));
      Factory.retrieveToDoList();
    }
}
