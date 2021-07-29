console.clear();

let inputText = document.getElementById('input-text');
let addBtn = document.getElementById('addBtn');
let todoItemsWrapper = document.getElementById('todo-items-wrapper');
let itemCount = document.getElementById('totalItem');

const getTodoFromStorage = () => {
  var todoListStorage = localStorage.getItem('todoList');
    var todoListStorage = todoListStorage === null ? [] : JSON.parse(todoListStorage);
  return todoListStorage;
}
const renderTodoFromStorage = (currentInput) => {
  if(currentInput!==''&&currentInput!==null){
  var firstChild = todoItemsWrapper.firstElementChild; 
  var newCard = createTodo(currentInput);  todoItemsWrapper.insertBefore(newCard,firstChild);
  inputText.value = '';
  itemCount.innerHTML = todoItemsWrapper.childElementCount;
  }else{
    alert("Please enter a valid Todo Input");
  }
}

const renderFromTodoStorage = () => {
  var todolistStorage = getTodoFromStorage();
  if(todolistStorage !== []){
    for(var i=0;i<todolistStorage.length;i++){
      console.log(todolistStorage[i]);
      renderTodoFromStorage(todolistStorage[i].text);
    }
  }
}

const createTodo = (data) => {
  var todoListStorage = getTodoFromStorage();
  // <div class="todo-item">
  //     <p>Buy a new gaming laptop</p>
  //     <div id="item1">
  //       <i class="fas fa-trash"></i>
  //     </div>
  //   </div>
  var todoItem = document.createElement('div');
  todoItem.id = 'todo'+(todoListStorage.length + 1);
  todoItem.className = 'todo-item';
  var todoPara = document.createElement('p');
  var todoText = document.createTextNode(data);
  todoPara.appendChild(todoText);
  var todoDiv = document.createElement('div');
  todoDiv.id = 'item'+(todoItemsWrapper.childElementCount + 1);
  todoDiv.addEventListener('click', ()=>{
    remove(todoDiv);
  });
  var todoIcon = document.createElement('i');
  todoIcon.className = 'fas fa-trash';
  todoDiv.appendChild(todoIcon);
  
  todoItem.append(todoPara, todoDiv);
  return todoItem;
  
}
const feed = () => {
  let currentInput = inputText.value;
  if(currentInput!==''&&currentInput!==null){
  var firstChild = todoItemsWrapper.firstElementChild; 
  var newCard = createTodo(currentInput);  todoItemsWrapper.insertBefore(newCard,firstChild);
  inputText.value = '';
  itemCount.innerHTML = todoItemsWrapper.childElementCount;
    var mObj = {
      id : newCard.id,
      text : currentInput
    }
    var todoListStorage = getTodoFromStorage();
    todoListStorage.push(mObj); localStorage.setItem('todoList',JSON.stringify(todoListStorage));
  }else{
    alert("Please enter a valid Todo Input");
  }
}

inputText.addEventListener('keyup',(e)=>{
  if(e.which===13)
    feed();
});
addBtn.addEventListener('click',feed);

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click',()=>{
  todoItemsWrapper.innerHTML='';
  localStorage.clear(); // clear local storage
  itemCount.innerHTML = 0;
});

function remove(id){ 
  //remove item from localStorage----
  // var todolistStorage = getTodoFromStorage();
  // if(todolistStorage !== []){
  //   for(var i = 0;i<todolistStorage.length; i++){
  //     if(todolistStorage[i].id === id.parentNode)
  //       todolistStorage[i].pop();
  //       break;
  //   }        localStorage.setItem('todoList',JSON.stringify(todoListStorage));
  // }
  id.parentNode.parentNode.removeChild(id.parentNode);
  itemCount.innerHTML = todoItemsWrapper.childElementCount;
}

//render from local Storage
renderFromTodoStorage();