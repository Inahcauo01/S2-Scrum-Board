
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }


document.getElementById("addtask").addEventListener("click",createTask);
document.getElementById("save").addEventListener("click",saveTask);
document.getElementById("edit").addEventListener("click",updateTask);
display();

function display(){
    var afficher;
    var icon="";
    var c1=0,c2=0,c3=0;
    tasks.forEach((task,index) => {
        if(task.status=='To Do'){
            afficher = document.getElementById("to-do-tasks");
            icon="fa-regular fa-circle-question fa-lg pt-2 text-success";
            c1++;

        }
        else if(task.status=='In Progress'){
            afficher = document.getElementById("in-progress-tasks");
            icon="fa fa-circle-notch fa-lg pt-2 text-success";
            c2++;
        }  
        else{
            afficher = document.getElementById("done-tasks");
            icon="fa-regular fa-circle-check fa-lg pt-2 text-success";
            c3++;
        }

    document.getElementById("to-do-tasks-count").innerHTML=c1;
    document.getElementById("in-progress-tasks-count").innerHTML=c2;
    document.getElementById("done-tasks-count").innerHTML=c3;
    
    afficher.innerHTML += `
    <button class="border d-flex py-2 task" data-bs-toggle="modal" data-bs-target="#MDL" draggable="true" ondragstart="drag(event)" onclick="editTask(${index})">
        <div class="col-sm-1 pe-2">
            <i class="${icon}"></i> 
        </div>
        <div class="col-sm-11 text-start">
            <div class="fw-bolder">${task.title}</div>
            <div class="">
                <div class="">#${index+1} created in ${task.date}</div>
                <div class="text-desc" title="${task.description}">${task.description}</div>
            </div>
            <div class="">
                <span class="btn btn-primary btn-sm">${task.priority}</span>
                <span class="btn bg-light-600 btn-sm">${task.type}</span>
            </div>
        </div>
    </button>
    `;
    // btn.classList.add("border", "d-flex", "py-2", "task");
    // btn.setAttribute("data-bs-toggle","modal");
    // btn.setAttribute("data-bs-target","#MDL");
    // btn.setAttribute("onclick","editTask(index) " );
    });
}

function clearTasks(){
    let tasks = document.querySelectorAll('.task');
    for(t of tasks){
        t.remove();
    }
}

function createTask() {
    $('#form').trigger("reset");
    // Afficher le boutton save
    // Ouvrir modal form
}

function saveTask() {
    // Recuperer task attributes a partir les champs input
    let titre = document.getElementById("titre");
    let priority = document.getElementById("Priority");
    let statu = document.getElementById("Status");
    let date = document.getElementById("Date");
    let desc = document.getElementById("desc");
    let type = document.querySelector("input[name='type']:checked");

    // Créez task object
    //alert(type);
    let task={
        'title'         :   titre.value,
        'type'          :   type.value,
        'priority'      :   priority.value,
        'status'        :   statu.value,
        'date'          :   date.value,
        'description'   :   desc.value,
    }

    // Ajoutez object au Array
    tasks.push(task);
    // refresh tasks
    clearTasks();
    display();
    
}

let titre = document.getElementById("modified-name");
let type = document.querySelector("input[name='radio-type']");
let priority = document.getElementById("modified-select");
let statu = document.getElementById("modifiedStatus-select");
let date = document.getElementById("date-modifier");
let desc = document.getElementById("modifiedMessage-text");

var idx;
function editTask(index) {
    // Initialisez task form
    idx=index;
    
    // Affichez updates
    titre.value= tasks[index].title;
    type = tasks[index].type;
    priority.value= tasks[index].priority;
    statu.value= tasks[index].status;
    date.value= tasks[index].date;
    desc.value= tasks[index].description;
    
    
    if(type==='Bug'){
        alert(type);
        
        document.querySelector("#bug").checked = true;
        document.getElementById("feature").checked = false;

        // document.getElementById("feature").checked = false;
        //document.getElementById("bug").value="Bug";
    }else{
        document.getElementById("feature").checked = true;
    }
    // Delete Button

    // Définir l’index en entrée cachée pour l’utiliser en Update et Delete

    // Definir FORM INPUTS

    // Ouvrir Modal form
}

function updateTask() {

    // GET TASK ATTRIBUTES FROM INPUTS
    let titre = document.getElementById("modified-name");
    let type = document.querySelector("input[name='radio-type']:checked");
    let priority = document.getElementById("modified-select");
    let statu = document.getElementById("modifiedStatus-select");
    let date = document.getElementById("date-modifier");
    let desc = document.getElementById("modifiedMessage-text");
    // Créez task object
    tasks[idx].title= titre.value;
    tasks[idx].type= type.value;
    tasks[idx].priority= priority.value;
    tasks[idx].status= statu.value;
    tasks[idx].date= date.value;
    tasks[idx].description= desc.value;
    // Remplacer ancienne task par nouvelle task
    clearTasks();
    display();
    // Fermer Modal form

    // Refresh tasks
    
}

function deleteTask() {
    // Get index of task in the array
    tasks.splice(idx,1);
    // Remove task from array by index splice function

    // close modal form
    clearTasks();
    display();
    // refresh tasks
}

function initTaskForm() {
    // Clear task form from data

    // Hide all action buttons
}

function reloadTasks() {
    // Remove tasks elements

    // Set Task count
}