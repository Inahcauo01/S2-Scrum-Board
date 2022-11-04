<?php
    //INCLUDE DATABASE FILE
    include('database.php');
    //SESSSION IS A WAY TO STORE DATA TO BE USED ACROSS MULTIPLE PAGES
    session_start();
    //ROUTING
    if(isset($_POST['save']))        saveTask();
    if(isset($_POST['update']))      updateTask();
    if(isset($_GET['Suppid']))       deleteTask();
    
    
    function getTasks($containerTasks)
    {   
        include('database.php');
        $icon="";
        $sql = "SELECT ts.id id, title, type_id, status_id, priority_id ,task_datetime,description,t.name type_name, p.name priority_name from tasks ts,status s,types t,priorities p 
                    where ts.type_id=t.id and ts.status_id=s.id and ts.priority_id=p.id and ";
        
        if($containerTasks=="todo"){
            $sql .= "ts.status_id=1";
            $icon="fa-regular fa-circle-question fa-lg pt-2 text-success";
        }
        else if($containerTasks=="inprogress"){
            $sql .= " s.name='In Progress'";
            $icon="fa fa-circle-notch fa-lg pt-2 text-success";
        }
        else{
            $sql .= " s.name='Done'";
            $icon="fa-regular fa-circle-check fa-lg pt-2 text-success";
        }
        $result = mysqli_query($conn,$sql);
        
        if(mysqli_num_rows($result)>0){
            while($task = mysqli_fetch_assoc($result)){
        echo "
            <button name=\"btnTask\" class=\"border d-flex py-2 task btnTaskIcon\"  
            onclick=\"updateButton(".$task["id"].",'".$task["title"]."','".$task["type_id"]."','".$task["status_id"]."','".$task["priority_id"]."','".$task["task_datetime"]."','".$task["description"]."')\">
                <div class=\"col-sm-1 pe-2\">
                    <i class=\"". $icon ."\"></i> 
                </div>
                <div class=\"col-sm-11 text-start\">
                    <div class=\"d-flex justify-content-between\">
                        <div class=\"fw-bolder\">".$task["title"]."</div>
                        <i onclick=\"supp(".$task["id"].")\" class=\"fa-regular fa-square-minus text-danger fa-2x btnIcon\"></i>
                    </div>
                    <div>
                        <div>#".$task["id"] ." created in ".$task["task_datetime"]."</div>
                        <div class=\"text-desc\" title=\"".$task["description"]."\">".$task["description"]."</div>
                    </div>
                        <div class=\"d-flex justify-content-between\">
                            <div>
                                <span class=\"btn btn-primary btn-sm\">".$task["priority_name"]."</span>
                                <span class=\"btn bg-light-600 btn-sm\">".$task["type_name"]."</span>
                            </div>
                            <div>
                                <i class=\"fa-regular fa-pen-to-square text-secondary btnIcon\" data-bs-toggle=\"modal\" data-bs-target=\"#modal-task\" ></i>
                            </div>
                        </div>
                        <div>
                            <a href=\"index.php?Suppid=".$task["id"]."\" id=\"deleteclick".$task["id"]."\"></a>
                        <div>
                    </div>
                </div>
            </button>
                ";
            }
    
        }
    }


    function saveTask()
    {   
        include('database.php');
        //CODE HERE
        $title      = $_POST["task-title"];
        $type       = $_POST["task-type"];
        $priority   = $_POST["task-priority"];
        $status     = $_POST["task-status"];
        $date       = $_POST["task-date"];
        $description= $_POST["task-description"];
        if(!isset($_POST["task-title"]) ||!isset($_POST["task-type"]) ||!isset($_POST["task-priority"]) ||!isset($_POST["task-status"]) ||!isset($_POST["task-date"]) ||!isset($_POST["task-description"]) ){
            $_SESSION['validation'] = "Veuiller remplir tous les champs !";
		    header('location: index.php');
        }
        else{
            //SQL INSERT
        $sql="INSERT INTO tasks (`title`, `type_id`, `priority_id`, `status_id`, `task_datetime`,`description`) 
                        VALUES ('$title', '$type','$priority','$status','$date','$description')";
        $result = mysqli_query($conn,$sql);
        
        $_SESSION['message'] = "Task has been added successfully !";
		header('location: index.php');
        }
        
    }
    

    function updateTask()
    {   
        include('database.php');
        //CODE HERE
        $id         = $_POST["task-id"];
        $title      = $_POST["task-title"];
        $type       = $_POST["task-type"];
        $priority   = $_POST["task-priority"];
        $status     = $_POST["task-status"];
        $date       = $_POST["task-date"];
        $description= $_POST["task-description"];
        
        //SQL INSERT
        $sql = "UPDATE tasks set title='{$title}' , type_id='{$type}' , priority_id='{$priority}',status_id='{$status}', task_datetime='{$date}' , description='{$description}' WHERE id=$id";

        $result = mysqli_query($conn,$sql);
        
        //executer le requete de l'update et redirection vers la page offre.php
        if ($result) {
            $_SESSION['message'] = "Task has been updated successfully !";
		    header('location: index.php');
        }else
        echo "error lors de la modification";
    }

    function deleteTask()
    {   include('database.php');
        //CODE HERE
        $sql = "DELETE FROM tasks WHERE id=".$_GET['Suppid'];
        $result = mysqli_query($conn,$sql);
        //SQL DELETE
        $_SESSION['message'] = "Task has been deleted successfully !";
		header('location: index.php');
    }

    function countertask($id){
        include('database.php');
        $sql ="select * from tasks where status_id =".$id;
        $result=mysqli_query($conn,$sql);
        echo mysqli_num_rows($result);
    }

?>