document.getElementById('addtask').addEventListener('click', ()=>{
    document.getElementById('form-task').reset();
    document.getElementById('btnSave').style.display = 'block';
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnDelete').style.display = 'none';
});

function editTask(id){
    // $("#modal-task").modal('show')

    btnSave.style.display = 'none';
    btnDelete.style.display = 'none';
    btnUpdate.style.display = 'block';
    
    // document.querySelector("#task-id").value = id;
    
}