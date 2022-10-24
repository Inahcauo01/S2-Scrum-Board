

document.getElementById("addtask").addEventListener("click",createTask);
document.getElementById("save").addEventListener("click",saveTask);
document.getElementById("edit").addEventListener("click",updateTask);
reloadTask();

function createTask() {
    //initialiser les champs du Modal 
    initTaskForm()
    // Afficher le boutton save
    // Ouvrir modal form
}

function saveTask() {
    // Recuperer task attributes a partir les champs input
    let titreTask = document.getElementById("titre");
    let priorityTask = document.getElementById("Priority");
    let statuTask = document.getElementById("Status");
    let dateTask = document.getElementById("Date");
    let descriptionTask = document.getElementById("description");
    let typeTask = document.querySelector("input[name='type']:checked");
    
    if(priorityTask.value=="0" || statuTask.value=="0" || !titreTask.value || !dateTask.value || !descriptionTask.value){
        alert('Veuillez remplir les champs :/');
    }else{
    // Créez task object
    let task={
        'title'         :   titreTask.value,
        'type'          :   typeTask.value,
        'priority'      :   priorityTask.value,
        'status'        :   statuTask.value,
        'date'          :   dateTask.value,
        'description'   :   descriptionTask.value,
    }

    // Ajoutez object au Array
    tasks.push(task);
    // refresh tasks
    
    reloadTask();
}
    
}

let titre = document.getElementById("modified-name");
let type = document.querySelector("input[name='radio-type']");
let priority = document.getElementById("modified-select");
let statu = document.getElementById("modifiedStatus-select");
let date = document.getElementById("date-modifier");
let description = document.getElementById("modifiedMessage-text");

var indice;
function editTask(index) {
    // Initialisez task form
    indice=index;
    // Affichez updates
    titre.value= tasks[index].title;
    type = tasks[index].type;
    priority.value= tasks[index].priority;
    statu.value= tasks[index].status;
    date.value= tasks[index].date;
    description.value= tasks[index].description;
    
    if(type == "Bug"){
        document.getElementById("Mbug").checked= true;
    }else{
        document.getElementById("Mfeature").checked= true;
    }
    // document.getElementById("edit").onclick=()=>{
    //     updateTask(index);
    // }
    // document.getElementById("edit").addEventListener("click",()=>{updateTask(index)});
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
    let description = document.getElementById("modifiedMessage-text");
    // Créez task object
    tasks[indice].title= titre.value;
    tasks[indice].type= type.value;
    tasks[indice].priority= priority.value;
    tasks[indice].status= statu.value;
    tasks[indice].date= date.value;
    tasks[indice].description= description.value;
    // Remplacer ancienne task par nouvelle task
    reloadTask();
    // Fermer Modal form

    // Refresh tasks
    
}

function deleteTask() {
    // Get index of task in the array
    // if(confirm("La tache va etre supprimer "))
    tasks.splice(indice,1);
    // Remove task from array by index splice function

    // close modal form

    // refresh tasks
    reloadTask();
}

function initTaskForm() {
    // Clear task form from data
    $('#form').trigger("reset");
    // Hide all action buttons
}

function reloadTask(){
    clearTasks();
    var afficher;
    var icon="";
    var compteurTodo=0, compteurProgress=0, compteurDone=0;
    tasks.forEach((task,index) => {
        if(task.status=='To Do'){
            afficher = document.getElementById("to-do-tasks");
            icon="fa-regular fa-circle-question fa-lg pt-2 text-success";
            compteurTodo++;

        }
        else if(task.status=='In Progress'){
            afficher = document.getElementById("in-progress-tasks");
            icon="fa fa-circle-notch fa-lg pt-2 text-success";
            compteurProgress++;
        }  
        else{
            afficher = document.getElementById("done-tasks");
            icon="fa-regular fa-circle-check fa-lg pt-2 text-success";
            compteurDone++;
        }

    document.getElementById("to-do-tasks-count").innerHTML=compteurTodo;
    document.getElementById("in-progress-tasks-count").innerHTML=compteurProgress;
    document.getElementById("done-tasks-count").innerHTML=compteurDone;
    
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
    });
}
function clearTasks(){
    let tasks = document.querySelectorAll('.task');
    for(t of tasks){
        t.remove();
    }
}