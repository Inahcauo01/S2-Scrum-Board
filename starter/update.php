<?php	
    include('scripts.php');
?>
<!DOCTYPE html>
<html lang="fr" >
<head>
	<meta charset="utf-8" />
	<title>YouCode | Scrum Board</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	<!-- ================== BEGIN core-css ================== -->
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
	<link href="assets/css/vendor.min.css" rel="stylesheet" />
	<link href="assets/css/default/app.min.css" rel="stylesheet" />
	<link href="assets/css/style.css" rel="stylesheet" />
	<!-- ================== END core-css ================== -->
</head>
<body>
	
	<!-- BEGIN #app -->
	<div id="app" class="app-without-sidebar">
		<!-- BEGIN #content -->
		<div id="content" class="app-content main-style">
			<div class="d-flex justify-content-between">
				<div>
					<ol class="breadcrumb">
						<li class="breadcrumb-item active"><a href="javascript:;">Home</a></li>
						<li class="breadcrumb-item">Scrum Board </li>
					</ol>
					<!-- BEGIN page-header -->
					<a href="index.php" style="text-decoration:none;color:black"><h1 class="page-header">
						Scrum Board 
					</h1></a>
					<!-- END page-header -->
				</div>
				
				<div class="d-flex align-self-center">
					<button class="btn btn-success rounded-pill" id="addtask" data-bs-toggle="modal" data-bs-target="#modal-task"><i class="fa fa-plus"></i> Add Task</a>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-4">
					<div class="bg-dark mt-3 rounded-top">
						<div class="bg-dark text-white pt-2 rounded-top">
							<h4 class="ps-3">To do (<span id="to-do-tasks-count"><?php countertask(1) ?></span>)</h4>

						</div>
						<div class="d-flex flex-column shadow" id="to-do-tasks">
							<!-- TO DO TASKS HERE -->
							<?php
							getTasks("todo")
							?>
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="bg-dark mt-3 rounded-top">
						<div class="bg-dark text-white pt-2 rounded-top">
							<h4 class="ps-3">In Progress (<span id="in-progress-tasks-count"><?php countertask(2) ?></span>)</h4>

						</div>
						<div class="d-flex flex-column shadow" id="in-progress-tasks">
							<!-- IN PROGRESS TASKS HERE -->
							<?php
							getTasks("inprogress")
							?>
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<div class="bg-dark mt-3 rounded-top">
						<div class="bg-dark text-white pt-2 rounded-top" >
							<h4 class="ps-3">Done (<span id="done-tasks-count"><?php countertask(3) ?></span>)</h4>

						</div>
						<div class="d-flex flex-column shadow" id="done-tasks">
							<!-- DONE TASKS HERE -->
							<?php
							getTasks("done")
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- END #content -->
		
		
		<!-- BEGIN scroll-top-btn -->
		<a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top" data-toggle="scroll-to-top"><i class="fa fa-angle-up"></i></a>
		<!-- END scroll-top-btn -->
	</div>
	<!-- END #app -->
	<?php
	if(isset($_GET['Upid'])){
		echo "<script>document.getElementById('addtask').click();</script>";
	$sql="select * from tasks where id=".$_GET['Upid'];
	$result = mysqli_query($conn,$sql);
	if (mysqli_num_rows($result) > 0) {
		$task = mysqli_fetch_assoc($result);
	?>
	<!-- TASK MODAL -->
	<div class="modal fade" id="modal-task">
		<div class="modal-dialog">
			<div class="modal-content">
				<form action="scripts.php" method="POST" id="form-task">
					<div class="modal-header">
						<h5 class="modal-title">Add Task</h5>
						<a href="#" class="btn-close" data-bs-dismiss="modal"></a>
					</div>
					<div class="modal-body">
							<!-- This Input Allows Storing Task Index  -->
							<input type="hidden" name="task-id" id="task-id" value="<?php echo $task['id'] ?>">
							<div class="mb-3">
								<label class="form-label">Title</label>
								<input type="text" class="form-control" id="task-title" name="task-title" value="<?php echo $task['title'] ?>" />
							</div>
							<div class="mb-3">
								<label class="form-label">Type</label>
								<div class="ms-3">
									<div class="form-check mb-1">
										<input class="form-check-input" name="task-type" type="radio" value="1" <?php echo ($task['type_id']== '1') ?  "checked" : "" ;?> id="task-type-feature"/>
										<label class="form-check-label" for="task-type-feature">Feature</label>
									</div>
									<div class="form-check">
										<input class="form-check-input" name="task-type" type="radio" value="2" <?php echo ($task['type_id']== '2') ?  "checked" : "" ;?> id="task-type-bug"/>
										<label class="form-check-label" for="task-type-bug">Bug</label>
									</div>
								</div>
								
							</div>
							<div class="mb-3">
								<label class="form-label">Priority</label>
								<select class="form-select" id="task-priority" name="task-priority">
									<option value="">Please select</option>
									<option value="1" <?php echo ($task['priority_id']== '1') ?  "selected" : "" ;?>>Low</option>
									<option value="2" <?php echo ($task['priority_id']== '2') ?  "selected" : "" ;?>>Medium</option>
									<option value="3" <?php echo ($task['priority_id']== '3') ?  "selected" : "" ;?>>High</option>
								</select>
							</div>
							<div class="mb-3">
								<label class="form-label">Status</label>
								<select class="form-select" id="task-status" name="task-status">
									<option value="">Please select</option>
									<option value="1" <?php echo ($task['status_id']== '1') ?  "selected" : "" ;?>>To Do</option>
									<option value="2" <?php echo ($task['status_id']== '2') ?  "selected" : "" ;?>>In Progress</option>
									<option value="3" <?php echo ($task['status_id']== '3') ?  "selected" : "" ;?>>Done</option>
								</select>
							</div>
							<div class="mb-3">
								<label class="form-label">Date</label>
								<input type="datetime-local" class="form-control" id="task-date" value="<?php echo $task['task_datetime'] ?>" name="task-date"/>
							</div>
							<div class="mb-0">
								<label class="form-label">Description</label>
								<textarea class="form-control" rows="10" id="task-description" name="task-description"><?php echo $task['description'] ?></textarea>
							</div>
						
					</div>
					<div class="modal-footer">
						<a href="#" class="btn btn-white" data-bs-dismiss="modal">Cancel</a>
						<button type="submit" name="delete" class="btn btn-danger task-action-btn" id="btnDelete">Delete</a>
						<button type="submit" name="update" class="btn btn-warning task-action-btn" id="btnUpdate">Update</a>
						<button type="submit" name="save" class="btn btn-primary task-action-btn" id="btnSave">Save</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<?php 
	}}
	?>
	
	<!-- ================== BEGIN core-js ================== -->
	<script src="assets/js/vendor.min.js"></script>
	<script src="assets/js/app.min.js"></script>
	<!-- ================== END core-js ================== -->
	<!-- <script src="assets/js/script.js"></script> -->
	<!-- <script src="assets/js/data.js"></script>
	<script src="assets/js/app.js"></script> -->
	<script src="scripts.js"></script>
	<script>
	// 	document.getElementById("deleteclick2").addEventListener("click",()=>{
	// 	if(confirm("voulez vous vraiment supprimer cette tache ?"))
	// 	document.getElementById("deleteclick").click();
	// })
		document.getElementById('addtask').click();
		
		document.getElementById('btnSave').style.display = 'none';
		document.getElementById('btnDelete').style.display = 'none';
		
		
		document.getElementById("addtask").addEventListener("click",()=>{
			
			document.getElementById('task-title').value="";
			document.getElementById('task-description').value="";
			document.getElementById('task-date').value="";
			document.getElementById('task-status').value="0";
			document.getElementById('task-priority').value="0";
			document.getElementById('btnDelete').style.display = 'none';
			document.getElementById('btnUpdate').style.display = 'none';
			document.getElementById('btnSave').style.display = 'block';
			
		});
		
	</script>
	
</body>
</html>