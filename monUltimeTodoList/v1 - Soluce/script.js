
/***************************************** SCRIPT START ************************ */

// 1. Je récupère le InputHTMLElement qui contient le nom de la todo liste
const nameTodoList = document.querySelector("#name-todo-list");
// 2. Je récupère le bouton de sauvegarde de la todo liste
const btnSaveList = document.querySelector("#save-todo");
// 3. Je récupère le bouton de vidage de la todo liste
const btnClearList = document.querySelector("#clear-todo");

// 4. Je récupère le champ de saisi de tache
const formtask = document.querySelector("#form");
// 5. Je récupère le conteneur des taches
const listTasks = document.querySelector(".list-tasks");
// 6. Je récupère la fenetre modal du menu burger, elle contient la liste de toutes mes listes
const loadListMenu = document.querySelector(".modal");


// 7. Je charge toutes les todo listes dans le menu burger
loadAllTodoLists();

// 8. J'écoute l'ajout d'une tache
formtask.addEventListener("submit",onAddTask);

// 9. Je sauvegarde la liste au clique sur le btn sauvegarder
btnSaveList.addEventListener("click",onSaveList);
// 10. Je sauvegarde la liste au clique sur le btn nouvelle liste
btnClearList.addEventListener("click",onClearList);

// 11. J'écoute la selection d'une todolist dans le menu burger
loadListMenu.addEventListener("click",onSelectTodoList);

/***************************************** SCRIPT ENDS ************************ */





/** Fonctions de gestion d'évenements******************************************** */
function onAddTask(event){
    event.preventDefault();
    const  todoValue = document.getElementById("todo").value;
    addTask(todoValue);
    form.reset();
}

function onSelectTodoList(event){
    const ls_listes = getListesFromLocalStorage();
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
    const currentTodoList = getCurrentTodoListContent();
    const currentListId = getCurrentTodoListId();

    const errorMsg = nameTodoList.nextElementSibling;
    const successMsg = document.querySelector(".list-save");

    const ls_todoListes = getListesFromLocalStorage();

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
    // Je charge toutes les todolistes dans le menu burger
    loadAllTodoLists();
}

function onClearList(){
    nameTodoList.value = "";
    listTasks.innerHTML = "";
    form.reset();
}

/** Fonction de gestion d'évenements ENDS******************************************** */


/** Procédures ********************************************************************** */

function loadAllTodoLists(){
    console.log("Loading todo list...");
    const ls_todoListes = getListesFromLocalStorage();
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

/** Getter****************************************************************************** */
function getListesFromLocalStorage(){
    const ls_todoListes_JSON = localStorage.getItem("todo-listes") || "[]";
    return JSON.parse(ls_todoListes_JSON);
}

/**
 * Renvoi un objet qui contient : le nom de la todolist actuellement à l'écran et un tableau des taches. Chaque tache etant composée d'un texte et d'un etat binaire : barrer(cross) ou non.
 * @returns {{name : string,[{text : string,cross:boolean}]}}
 */
function getCurrentTodoListContent(){
    const currentTasks_HTML = document.querySelectorAll(".task");
    const tasks = Array.prototype.map.call(currentTasks_HTML,(task)=>{
        return {text:task.innerText,cross: task.classList.contains("done") }
    });
    return {name:nameTodoList.value.trim(),tasks:tasks};
}

function getCurrentTodoListId(){
    return document.querySelector("#name-todo-list").getAttribute("data-listid");
}