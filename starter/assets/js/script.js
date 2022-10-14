document.getElementById("save").addEventListener("click",afficher);

function afficher(){
    var titre = document.getElementById("titre");
    var type = document.getElementById("titre");
    var t = document.getElementsByName("type");
    var priority = document.getElementById("Priority");
    var status = document.getElementById("Status");
    var date = document.getElementById("Date");
    var desc = document.getElementById("desc");
    var type;
    for(var i in t){
        if(t[i].checked == 1)   type=t[i];
    }







    // alert("Votre tache a enregistré avec success ! "+titre.value+" "+type.value+" "+priority.value+" "+status.value+" "+date.value+" "+desc.value);
}