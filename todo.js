#!/usr/bin/env node

// Basic CLI To-Do App


// Import required functions from fileHandler.js and taskManager.js
const {saveTasks, loadTasks} = require(`./src/fileHandler`);
const {addTask, markDone, listTasks, deleteTask, clearTasks} = require(`./src/taskManager`);


// Command, Argument & Argument Detecting
const [ ,  , command = `help`, argument, flag] = process.argv;

//Printing Processes
console.log(`Checking system...`);
console.log(`Action: ${command}`);
console.log(`Target: ${argument}`);

// Help Box
const help = {
    "add task": `todo add "task_name"`,
    "delete task": `todo delete X, where X refers to task number/ID.`,
    "delete all tasks": `todo delete --all`,
    "delet all tasks (no confirmation)": `todo delete --all -y`,
    "list pending tasks": `todo list`,
    "list completed tasks": `todo list --done`,
    "list all tasks": `todo list --all`,
    "clear completed tasks": `todo clear`
};

// Check Commands inputed by user
function checkCommand() {
    const tasks = loadTasks();

    if (command === `add`) {
        return addTask(tasks, argument);
    } else if (command === `done`) {
        return markDone(tasks, argument);
    } else if (command === `list`) {
        return listTasks(tasks, argument);
    } else if (command === `delete`) {
        return deleteTask(tasks, argument, flag, confirmAction);
    } else if (command === `clear`) {
        return clearTasks(tasks);
    } else if (command === `help`) {
        console.table(help);
    } else {
        showHelp();
        return console.log(`Unknown Command. Try "help" command.`);
    }
}

// Readline
const readline = require('readline');

// Confirm Action for `-y` flag
function confirmAction(message, callBack) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`${message} (y/n): `, (answer) => {
        rl.close();
        callBack(answer.toLowerCase() === `y`);
    })
}

// Display Help
function showHelp() {
    console.table(help);
}

// Calling checkCommand function
checkCommand();
