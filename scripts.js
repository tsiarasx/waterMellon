document.addEventListener("DOMContentLoaded", function() {

    let toDo=[];
    let inProgress=[];
    let done=[];

    /* Moving a task from toDo to InProgress */
    function moveTaskToInProgress(task) { 
        taskIndex=toDo.findIndex(x => x === task);
        lowerArray=toDo.slice(taskIndex+1);
        upperArray=toDo.slice(0,taskIndex)
        toDo=upperArray.concat(lowerArray);
        inProgress.push(task);

    }
    /* Moving a task from InProgress to Done */
    function moveTaskToDone(task) { 
        taskIndex=inProgress.findIndex(x => x === task);
        lowerArray=inProgress.slice(taskIndex+1);
        upperArray=inProgress.slice(0,taskIndex)
        inProgress=upperArray.concat(lowerArray);
        done.push(task);

    }
    /* Deleting a task from Done */
    function deleteTask(task) {
        taskIndex=done.findIndex(x => x === task);
        lowerArray=done.slice(taskIndex+1);
        upperArray=done.slice(0,taskIndex)
        done=upperArray.concat(lowerArray);
    }

    /* Adding Task to To Do List */
    function addTaskToList(task){
        query=document.querySelector(".table_to_do");
        row = query.insertRow();
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = task;
        cell2.innerHTML = "<button class='move_to_in_progress'>Move to In Progress</button>";
        
    }

    /* Adding Task to In Progress List */
    function addTaskToInProgress(task){
        const table = document.querySelector(".table_in_progress");
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = task;
        cell2.innerHTML = "<button class='move_to_done'>Move to Done</button>";
    }

    /* Adding Task to Done List */
    function addTaskToDone(task){
        const table = document.querySelector(".table_done");
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = task;
        cell2.innerHTML = "<button class='delete'>Delete</button>";
    }



    /* Adding task from the form */
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const input = document.querySelector("#text");
        const task = input.value;
        if (task) {
            addTaskToList(task);
            toDo.push(task);
            input.value = "";
        }
    });

     /* Moving tasks from to do to in progress */
    document.querySelector('.table_to_do').addEventListener('click', function(e) {
        if (e.target.classList.contains('move_to_in_progress')) {
            const task = e.target.parentElement.previousElementSibling.textContent;
            moveTaskToInProgress(task);
            e.target.closest('tr').remove();
            addTaskToInProgress(task);
        }
    });

    /* Moving tasks from in progress to done */
    document.querySelector('.table_in_progress').addEventListener('click', function(e) {
        if (e.target.classList.contains('move_to_done')) {
            const task = e.target.parentElement.previousElementSibling.textContent;
            moveTaskToDone(task);
            e.target.closest('tr').remove();
            addTaskToDone(task);
        }
    });

    /* Deleting tasks from done */
    document.querySelector('.table_done').addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            const task = e.target.parentElement.previousElementSibling.textContent;
            deleteTask(task);
            e.target.closest('tr').remove();
        }
    });

 
    function loadConfig(){
        fetch("config.json")
            .then(res=>res.json())
            .then(post=>{
                document.body.style.backgroundColor=post.backround_color;
            })
            .catch(err=> console.err(err));

    }
    loadConfig();  

    
    

});