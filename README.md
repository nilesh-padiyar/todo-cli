
# todo-cli

A simple, lightweight CLI To-Do app built with **Node.js**
Manage your tasks directly from the terminal with easy commands.

---

# Installation 

```npm install -g git+https://github.com/nilesh-padiyar/todo-cli.git```

<br>

## Prerequisites 

Before installing ```todo-cli```, make sure you have:

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- npm (comes with Node.js)

**Check versions in terminal -**
```node -v```   # to check Node.js version
```npm -v```   # to check npm version

---

## Usage

**1. Add a task:**
```todo add "task name"```

<br>

**2. Mark a task as done:**
```todo done <task_id>```

<br>

**3. List tasks -**
**(i) Pending tasks (default):**
``` todo list```

<br>

**(ii) Completed tasks:**
```todo list --done```

<br>

**(iii) All tasks:**
```todo list --all```

<br>

**4. Delete tasks -**
**(i) Delete a single task by ID:**
```todo delete <task_id>```

<br>

**(ii) Delete all tasks with confirmation:**
```todo delete --all```

<br>

**(iii) Delete all tasks without confirmation:**
```todo delete --all -y```

<br>

**5. Clear completed tasks -**
**(i) Clear completed tasks with confirmation:**
```todo clear```

<br>

**(ii) Clear completed without confirmation:**
```todo clear --all -y```

<br>

**6. Help:**
```todo help```

---

# Features

**Simple CLI interface**

Add, list, mark done, delete tasks

Optional ```-y``` flag for ```delete --all``` and ```clear``` to skip confirmation.

Stores tasks in **tasks.json** locally.

Designed for robust command usage (no flexible ordering)

---

# Privacy

**todo-cli** is a fully local CLI app. All tasks are stored on your device in ```tasks.json```.

No data is sent to any server or third-party service.

---

# Contributing

This project is for personal growth, but contributions are welcome.

Feel free to **fork**, **submit issues**, or **PRs**.

---

# License

**MIT** — free to use, modify, and distribute.

---
