
const chalk = require('chalk');

// Import required function from fileHandler.js
const { saveTasks } = require(`../utils/fileHandler`);

// Add Task to List
function addTask(tasks, argument) {
    const taskName = argument;

    if (!taskName) {
        return console.log(chalk.red(`Error: Please provide a task name.`));
    }

    const exists = tasks.some(t => t.text === taskName);

    if (exists) {
        return console.log(chalk.yellow(`Task already exists!`));
    }

    const newTask = {
        id: tasks.length > 0
            ? Math.max(...tasks.map(t => t.id)) + 1
            : 1,
        text: taskName,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);

    console.log(
        chalk.green(
            `Task added: "${taskName}" (ID: ${newTask.id})`
        )
    );
}

// Mark Completed Tasks
function markDone(tasks, argument) {
    const idStr = argument;
    const id = parseInt(idStr);

    if (!id) {
        return console.log(chalk.red(`Error: Please provide a valid ID.`));
    }

    const taskToMark = tasks.find(t => t.id === id);

    if (!taskToMark) {
        return console.log(
            chalk.red(`Task with ID ${id} not found.`)
        );
    }

    taskToMark.completed = true;
    saveTasks(tasks);

    console.log(
        chalk.green(
            `Marked task ${id} as done: "${taskToMark.text}"`
        )
    );
}

// List Tasks
function listTasks(tasks, argument) {
    if (tasks.length === 0) {
        return console.log(
            chalk.yellow(`Your To-Do List is empty.`)
        );
    }

    console.log(
        chalk.cyan(`\n--- YOUR TO-DO LIST ---`)
    );

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
            console.log(
                chalk.green(`All tasks deleted successfully.`)
            );
        } else {
            confirmAction(
                `Are you sure you want to delete All Saved Tasks?`,
                confirmed => {
                    if (confirmed) {
                        saveTasks([]);
                        console.log(
                            chalk.green(`All tasks deleted successfully.`)
                        );
                    } else {
                        console.log(
                            chalk.yellow(`Operation cancelled by user.`)
                        );
                    }
                }
            );
        }

        return;
    }

    // Delete single task with ID
    if (!id) {
        return console.log(
            chalk.red(`Error: Please provide a valid ID.`)
        );
    }

    const exists = tasks.some(t => t.id === id);

    if (!exists) {
        return console.log(
            chalk.red(`Task with ID ${id} not found.`)
        );
    }

    const newTaskList = tasks.filter(t => t.id !== id);

    saveTasks(newTaskList);

    console.log(
        chalk.green(`Task ${id} deleted successfully.`)
    );
}

// Clear Completed Tasks
function clearTasks(tasks, flag, confirmAction) {
    const completedExists = tasks.some(t => t.completed);

    if (!completedExists) {
        return console.log(
            chalk.yellow(`No completed tasks to clear.`)
        );
    }

    if (flag === `-y`) {
        const remaining = tasks.filter(t => !t.completed);

        saveTasks(remaining);

        console.log(
            chalk.green(`All completed tasks cleared successfully.`)
        );
    } else {
        confirmAction(
            `Are you sure you want to clear all completed tasks?`,
            confirmed => {
                if (confirmed) {
                    const remaining = tasks.filter(t => !t.completed);

                    saveTasks(remaining);

                    console.log(
                        chalk.green(`All completed tasks cleared successfully.`)
                    );
                } else {
                    console.log(
                        chalk.yellow(`Operation cancelled by user.`)
                    );
                }
            }
        );
    }

    return;
}

// Search Tasks
function searchTasks(tasks, argument) {
    const keyword = argument;

    if (!keyword) {
        return console.log(
            chalk.red(`Error: Please provide a search keyword.`)
        );
    }

    const results = tasks.filter(task =>
        task.text.toLowerCase().includes(keyword.toLowerCase())
    );

    if (results.length === 0) {
        return console.log(
            chalk.yellow(`No matching tasks found.`)
        );
    }

    console.log(
        chalk.cyan(`\n--- SEARCH RESULTS ---`)
    );

    console.table(results);
}

// Export Functions
module.exports = {
    addTask,
    markDone,
    listTasks,
    deleteTask,
    clearTasks,
    searchTasks
};
