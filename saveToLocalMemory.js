document.addEventListener("DOMContentLoaded", function() {
    // Single localStorage key for the whole board state.
    const STORAGE_KEY = "kanbanTasks";

    // Read all task labels from one table and return them as an array.
    function getTasksFromTable(tableSelector) {
        const rows = document.querySelectorAll(`${tableSelector} tr`);
        return Array.from(rows)
            .map((row) => row.cells[0] && row.cells[0].textContent ? row.cells[0].textContent.trim() : "")
            .filter((task) => task.length > 0);
    }

    // Persist current board columns into localStorage.
    function saveTasksToLocalStorage() {
        const tasks = {
            toDo: getTasksFromTable(".table_to_do"),
            inProgress: getTasksFromTable(".table_in_progress"),
            done: getTasksFromTable(".table_done")
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    // Reusable renderer used when restoring tasks from storage.
    function addTaskRow(tableSelector, task, buttonClass, buttonLabel) {
        const table = document.querySelector(tableSelector);
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = task;
        cell2.innerHTML = `<button class='${buttonClass}'>${buttonLabel}</button>`;
    }

    // Rebuild all columns from localStorage on page load.
    function loadTasksFromLocalStorage() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return;
        }

        try {
            const tasks = JSON.parse(raw);

            (tasks.toDo || []).forEach((task) => {
                addTaskRow(".table_to_do", task, "move_to_in_progress", "Move");
            });

            (tasks.inProgress || []).forEach((task) => {
                addTaskRow(".table_in_progress", task, "move_to_done", "Next");
            });

            (tasks.done || []).forEach((task) => {
                addTaskRow(".table_done", task, "delete", "Delete");
            });
        } catch (error) {
            // Corrupted JSON should not break the app.
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function() {
            // Wait for scripts.js to finish adding the new row first.
            setTimeout(saveTasksToLocalStorage, 0);
        });
    }

    document.addEventListener("click", function(event) {
        if (
            event.target.classList.contains("move_to_in_progress") ||
            event.target.classList.contains("move_to_done") ||
            event.target.classList.contains("delete")
        ) {
            // Wait for move/delete DOM updates, then store final state.
            setTimeout(saveTasksToLocalStorage, 0);
        }
    });

    // Final safety save before leaving the page.
    window.addEventListener("beforeunload", saveTasksToLocalStorage);

    loadTasksFromLocalStorage();
    // Ensure localStorage always has the expected object shape.
    saveTasksToLocalStorage();

});