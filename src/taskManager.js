
// Handles all the properties of app


// Import required function from fileHandler.js and todo.js
const {saveTasks} = require(`./fileHandler`);

// Add Task to List
function addTask(tasks, argument) {
    const taskName = argument;

    if (!taskName) {
        return console.log(`Error: Please provide a task name.`);
    }

    const exists = tasks.some(t => t.text === taskName);
    if (exists) {
        return console.log(`Task already exists!`);
    }

    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        text: taskName,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added: "${taskName}" (ID: ${newTask.id})`);    
}

// Mark Completed Tasks
function markDone(tasks, argument) {
    const idStr = argument;
    const id = parseInt(idStr);

    if (!id) {
        return console.log(`Error: Please provide a valid ID.`);
    }
    
    const taskToMark = tasks.find(t => t.id === id);

    if (!taskToMark) {
        return console.log(`Task with ID ${id} not found.`);
    }

    taskToMark.completed = true;
    saveTasks(tasks);
    console.log(`Marked task ${id} as done: "${taskToMark.text}"`);
}

// List Tasks
function listTasks(tasks, argument) {
    if (tasks.length === 0) {
        return console.log(`Your To-Do List is empty.`);
    }

    console.log(`\n--- YOUR TO-DO LIST ---`);

    if (argument === `--all`) {
        console.table(tasks);
    } else if (argument === `--done`) {
        const completed = tasks.filter(t => t.completed);
        console.table(completed);
    } else {
        const pending = tasks.filter(t => !t.completed);
        console.table(pending);
    }
}

// Delete Tasks
function deleteTask(tasks, argument, flag, confirmAction) {
    const idStr = argument;
    const id = parseInt(idStr);

    // Delete all Tasks
    if (argument === `--all`) {
        if (flag === `-y`) {
            saveTasks([]);
            console.log(`All tasks deleted successfully.`);
        } else {
            confirmAction(`Are you sure you want to delete All Saved Tasks?`, confirmed => {
                if (confirmed) {
                    saveTasks([]);
                    console.log(`All tasks deleted successfully.`);
                } else {
                    console.log(`Operation cancelled by user.`);
                }
            });
        }
        return;
    }

    // Delete single task with ID
    if (!id) {
        return console.log(`Error: Please provide a valid ID.`);
    }

    const exists = tasks.some(t => t.id === id);
    if (!exists) {
        return console.log(`Task with ID ${id} not found.`);
    }

    const newTaskList = tasks.filter(t => t.id !== id);

    saveTasks(newTaskList);
    console.log(`Task ${id} deleted successfully.`);
}

// Clear Completed Tasks
function clearTasks(tasks) {
    const toClear = tasks.filter(t => !t.completed);
    return saveTasks(toClear);
}

// Export Functions
module.exports = {addTask, markDone, listTasks, deleteTask, clearTasks};
