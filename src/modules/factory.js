// document.querySelector('.todo-list').innerHTML = '';
export default class Factory {
    static retrieveToDoList= () => {
      const todolist = JSON.parse(localStorage.getItem('ToDoList'));
      document.querySelector('.todo-list').innerHTML = '';
      for (let i = 0; i < todolist.length; i += 1) {
        todolist[i].Index = i;
        document.querySelector('.todo-list').innerHTML += `
        <div class="list-item-container">
            <div>
            <p class="checkbox-description-item"><input type="checkbox" id="checkid${i}" class="checkbox"><input type="text" id="idinput${i}" disabled class="input-descrption" value="${todolist[i].Description}"></p>
            </div>
            <span id="id${i}" class="menubutton"><i " class="fas fa-ellipsis-v"></i></span>
        </div>
        `;
        if (todolist[i].Complete) {
          document.getElementById(`idinput${i}`).classList.add('complete');
        }
      }
      Factory.checkCheckBoxes();
      localStorage.setItem('ToDoList', JSON.stringify(todolist));
    }

      static checkCheckBoxes = () => {
        const todolist = JSON.parse(localStorage.getItem('ToDoList'));
        for (let i = 0; i < todolist.length; i += 1) {
          if (todolist[i].Complete) {
            document.getElementById(`checkid${i}`).checked = true;
          } else {
            document.getElementById(`checkid${i}`).checked = false;
          }
        }
      }

      static createToDoListItem = (ToDoListItem) => {
        if (localStorage.getItem('ToDoList') === null) {
          const todolist = [];
          todolist.push(ToDoListItem);
          localStorage.setItem('ToDoList', JSON.stringify(todolist));
        } else {
          const todolist = JSON.parse(localStorage.getItem('ToDoList'));
          todolist.push(ToDoListItem);
          localStorage.setItem('ToDoList', JSON.stringify(todolist));
        }
        Factory.retrieveToDoList();
        document.getElementById('form').reset();
      }

      static removeToDoLIstItem = (i) => {
        const todolist = JSON.parse(localStorage.getItem('ToDoList'));
        todolist.splice(i, 1);
        localStorage.setItem('ToDoList', JSON.stringify(todolist));
        Factory.retrieveToDoList();
      }

      static editToDoListItem = (i, Description) => {
        const todolist = JSON.parse(localStorage.getItem('ToDoList'));
        for (let j = 0; j < todolist.length; j += 1) {
          if (i == j) {
            todolist[j].Description = Description;
          }
        }
        localStorage.setItem('ToDoList', JSON.stringify(todolist));
      }

      static AppendDeleteButton = (index) => {
        document.querySelector('.todo-list').innerHTML = '';
        const todolist = JSON.parse(localStorage.getItem('ToDoList'));
        for (let j = 0; j < todolist.length; j += 1) {
          if (j == index) {
            document.querySelector('.todo-list').innerHTML += `
                <div class="list-item-container selected">
                    <div>
                    <p class="checkbox-description-item"><input type="checkbox" id="checkid${j}" class="checkbox"><input  type="text" id="idinput${j}"  class="input-descrption selected" value="${todolist[j].Description}"><button id="IdDeleteButton${j}" class="deleteButton selected"><i class="fa-solid fa-trash-can"></i></button></p>
                    </div>
                    <span id="id${j}" class="menubutton"><i class="fas fa-ellipsis-v"></i></span>
                </div>
                `;
            if (todolist[j].Complete) {
              document.getElementById(`idinput${j}`).classList.add('complete');
            }
          } else {
            document.querySelector('.todo-list').innerHTML += `
                <div class="list-item-container">
                    <div>
                    <p class="checkbox-description-item"><input type="checkbox" id="checkid${j}" class="checkbox"><input type="text" id="idinput${j}" disabled class="input-descrption" value="${todolist[j].Description}"></p>
                    </div>
                    <span id="id${j}" class="menubutton"><i class="fas fa-ellipsis-v"></i></span>
                </div>
                `;
            if (todolist[j].Complete) {
              document.getElementById(`idinput${j}`).classList.add('complete');
            }
          }
        }
        const inputFocus = document.getElementById(`idinput${index}`);
        inputFocus.focus();
        Factory.checkCheckBoxes();
      }
}
