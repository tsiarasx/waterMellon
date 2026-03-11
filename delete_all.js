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