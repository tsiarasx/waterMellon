/*
 * delete_all.js
 *
 * Provides utilities for removing tasks from the board.  This file is kept
 * independent so that other modules (e.g. scripts.js) do not need to be
 * modified and will therefore avoid merge conflicts.  Only this file should be
 * touched when altering delete behavior.
 */

/**
 * Clear every task table in the UI and, if the task arrays are exposed on
 * window, reset them as well.
 *
 * The implementation deliberately makes no assumptions about where the
 * arrays are defined; it simply clears any global arrays named `toDo`,
 * `inProgress` and `done` if they exist.  This keeps the logic self‑contained.
 */
function deleteAllTasks() {
    const selectors = [
        '.table_to_do',
        '.table_in_progress',
        '.table_done'
    ];

    selectors.forEach(sel => {
        const table = document.querySelector(sel);
        if (table) {
            // remove all rows in the table
            table.innerHTML = '';
        }
    });

    // if the main script exposes arrays globally then clear them too
    ['toDo', 'inProgress', 'done'].forEach(name => {
        if (window[name] && Array.isArray(window[name])) {
            window[name].length = 0; // preserve reference
        }
    });
}

// automatically hook up a button if present on load, again without touching
// the HTML from this script.
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('delete-all');
    if (btn) {
        btn.addEventListener('click', deleteAllTasks);
    }
});


//    <script src="delete.js"></script>
//<button id="delete-all" class="delete-all-btn">Delete All Tasks</button>