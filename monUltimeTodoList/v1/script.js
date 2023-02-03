
const nameTodoList = document.querySelector("#name-todo-list");
const btnSaveList = document.querySelector("#save-todo");
const btnClearList = document.querySelector("#clear-todo");

const formtask = document.querySelector("#form");

const listTasks = document.querySelector(".list-tasks");

const loadListMenu = document.querySelector(".modal");


loadAllTodoLists();

formtask.addEventListener("submit",onAddTask);
loadListMenu.addEventListener("click",onSelectTodoList);

btnSaveList.addEventListener("click",onSaveList);
btnClearList.addEventListener("click",onClearList);

function onAddTask(event){
    event.preventDefault();
    const  todoValue = document.getElementById("todo").value;
    addTask(todoValue);
    form.reset();
}

function onSelectTodoList(event){
    const ls_listes = getLSListes();
    const listId = event.target.getAttribute("data-listid");

    nameTodoList.value =  ls_listes[listId].name;
    nameTodoList.setAttribute("data-listid",listId);

    const tasks = ls_listes[listId].tasks;

    listTasks.innerHTML = "";
    tasks.forEach(function(task){
       addTask(task.text,task.cross);
    });

    burger.click();
}

function onSaveList(event){
    const currentTodoList = getCurrentTodoList();
    const currentListId = getCurrentListId();

    const errorMsg = nameTodoList.nextElementSibling;
    const successMsg = document.querySelector(".list-save");

    const ls_todoListes = getLSListes();

    if(currentTodoList.name.length < 2){
        errorMsg.classList.remove("invisible");
        return;
    }
    else
        errorMsg.classList.add("invisible");

    if(currentListId !== ""){
        ls_todoListes[currentListId] = currentTodoList;
    }else{
        ls_todoListes.push(currentTodoList);
    }

    localStorage.setItem("todo-listes",JSON.stringify(ls_todoListes));

    successMsg.classList.remove("invisible");
    setTimeout(() => {
        successMsg.classList.add("invisible");    
    },3000);

    loadAllTodoLists();
}

function onClearList(){
    nameTodoList.value = "";
    form.reset()
    listTasks.innerHTML = "";
}
function loadAllTodoLists(){
    console.log("Loading todo list...");
    const ls_todoListes = getLSListes();
    loadListMenu.innerHTML = ``;

    ls_todoListes.forEach(function(todoList,index){
        loadListMenu.innerHTML += `<a class="listid" data-listid="${index}">${todoList.name}</a>`
    })
    console.log("Listes loaded");
}

function addTask(text,cross){
    listTasks.innerHTML+=
    `
    <div class="task ${cross?'done':''}">
        <p>${text}</p>
        <button class="btn-delete">
            <i class="fas fa-trash-alt"></i>
        </button>
        <button class="btn-archive">
            <i class="fas fa-check-circle"></i>
        </button>
    </div>
    `;

    const btnsDelete = document.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn)=>{
        btn.addEventListener("click",function(){
            const task = btn.parentElement; // Je recupere l'element parent au bouton soit la Task.
            task.remove(); // Je supprimme la tache
        })
    });

    const btnsArchive = document.querySelectorAll(".btn-archive");
    btnsArchive.forEach((btn)=>{
        btn.addEventListener("click",function(){
            btn.parentElement.classList.toggle("done");
        })
    });
}

function getLSListes(){
    const ls_todoListes_JSON = localStorage.getItem("todo-listes") || "[]";
    return JSON.parse(ls_todoListes_JSON);
}

function getCurrentTodoList(){
    const currentTasks_HTML = document.querySelectorAll(".task");
    const tasks = Array.prototype.map.call(currentTasks_HTML,(task)=>{
        return {text:task.innerText,cross: task.classList.contains("done") }
    });
    return {name:nameTodoList.value.trim(),tasks:tasks};
}
function getCurrentListId(){
    return document.querySelector("#name-todo-list").getAttribute("data-listid");
}