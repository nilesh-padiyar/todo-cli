
// Hanles tasks.json file


// File Path
const fs = require('fs');
const filePath = './tasks.json';

// Load Tasks
function loadTasks() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data): [];
}

// Save Tasks to .json file
function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Export Functions
module.exports = {loadTasks, saveTasks};
