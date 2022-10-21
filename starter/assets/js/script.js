//document.getElementById("save").addEventListener("click",afficher);

function afficher(){
    var titre = document.getElementById("titre").value;
    var t = document.getElementsByName("type");
    var priority = document.getElementById("Priority").value;
    var status = document.getElementById("Status").value;
    var date = document.getElementById("Date").value;
    var desc = document.getElementById("desc").value;
    var type;
    for(var i in t){
        if(t[i].checked == 1)   type=t[i].value;
    }

    if(priority=='0' || status=='0' || !titre || !date || !desc){
        alert('Veuillez remplir les champs :/');
    }else{
    var afficher;
    if(status=='To Do')
        afficher = document.getElementById("to-do-tasks");
    else if(status=='In Progress')
        afficher = document.getElementById("in-progress-tasks");
    else
        afficher = document.getElementById("done-tasks");
    
    var btn = document.createElement("button");
    btn.innerHTML = `
        <div class="col-sm-1 pe-2">
            <i class="fa-regular fa-circle-question fa-lg pt-2 text-success"></i> 
        </div>
        <div class="col-sm-11 text-start">
            <div class="fw-bolder">${titre}</div>
            <div class="">
                <div class="">#1 created in ${date}</div>
                <div class="text-desc" title="There is hardly anything more frustrating than having to look for current requirements in tens of comments under the actual description or having to decide which commenter is actually authorized to change the requirements. The goal here is to keep all the up-to-date requirements and details in the main/primary description of a task. Even though the information in comments may affect initial criteria, just update this primary description accordingly.">${desc}</div>
            </div>
            <div class="">
                <span class="btn btn-primary btn-sm">${priority}</span>
                <span class="btn btn-secondary btn-sm">${type}</span>
            </div>
        </div>
    `;
    btn.classList.add("border", "d-flex", "py-2");
    afficher.appendChild(btn);


    }
}

