document.addEventListener("DOMContentLoaded", function() {

    let toDo=[];
    let inProgress=[];
    let done=[];

    function moveTaskToInProgress(task) { 
        let taskIndex = toDo.findIndex(x => x === task);
        toDo.splice(taskIndex, 1);
        inProgress.push(task);
    }

    function moveTaskToDone(task) { 
        let taskIndex = inProgress.findIndex(x => x === task);
        inProgress.splice(taskIndex, 1);
        done.push(task);
    }

    function deleteTask(task) {
        let taskIndex = done.findIndex(x => x === task);
        done.splice(taskIndex, 1);
    }

    function addTaskToList(task){
        let query = document.querySelector(".table_to_do");
        let row = query.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = task;
        cell2.innerHTML = "<button class='move_to_in_progress'>Move</button>";
    }

    function addTaskToInProgress(task){
        const table = document.querySelector(".table_in_progress");
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = task;
        cell2.innerHTML = "<button class='move_to_done'>Next</button>";
    }

    function addTaskToDone(task){
        const table = document.querySelector(".table_done");
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = task;
        cell2.innerHTML = "<button class='delete'>Delete</button>";
    }

    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const input = document.querySelector("#text");
        const val = input.value;
        if (val) {
            const now = new Date();
            const timestamp = now.toLocaleDateString() + " | " + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const taskWithTime = `${val} <span class="task-time">${timestamp}</span>`;
            
            addTaskToList(taskWithTime);
            toDo.push(taskWithTime);
            input.value = "";
        }
    });

    document.querySelector('.table_to_do').addEventListener('click', function(e) {
        if (e.target.classList.contains('move_to_in_progress')) {
            const task = e.target.parentElement.previousElementSibling.innerHTML;
            moveTaskToInProgress(task);
            e.target.closest('tr').remove();
            addTaskToInProgress(task);
        }
    });

    document.querySelector('.table_in_progress').addEventListener('click', function(e) {
        if (e.target.classList.contains('move_to_done')) {
            const task = e.target.parentElement.previousElementSibling.innerHTML;
            moveTaskToDone(task);
            e.target.closest('tr').remove();
            addTaskToDone(task);
        }
    });

    document.querySelector('.table_done').addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            const task = e.target.parentElement.previousElementSibling.innerHTML;
            deleteTask(task);
            e.target.closest('tr').remove();
        }
    });

    // Background config
    fetch("config.json")
        .then(res => res.json())
        .then(post => {
            if(post.backround_color) document.body.style.backgroundColor = post.backround_color;
        })
        .catch(err => console.log("No config.json found, using default."));
});