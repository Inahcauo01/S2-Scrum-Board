document.getElementById("hupdate").addEventListener("click",validation);
function validation(){
    let titreTask = document.getElementById("titre");
    let priorityTask = document.getElementById("Priority");
    let statuTask = document.getElementById("Status");
    let dateTask = document.getElementById("Date");
    let descriptionTask = document.getElementById("description");
    
    if(priorityTask.value=="0" || statuTask.value=="0" || !titreTask.value || !dateTask.value || !descriptionTask.value)
        alert('Veuillez remplir les champs :/');
}