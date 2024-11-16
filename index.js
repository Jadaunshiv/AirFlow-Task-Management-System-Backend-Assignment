const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

// Endpoint 1

function addTask(taskId, text, priority) {
  let newTask = { taskId, text, priority };
  tasks.push(newTask);
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTask(taskId, text, priority);
  res.json(result);
});

// Endpoint 2

function readAllTasks() {
  return tasks;
}

app.get('/tasks', (req, res) => {
  let result = readAllTasks();
  res.json(result);
});

// Endpoint 3

function sortTaskByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(sortTaskByPriority);
  res.json(result);
});

// Endpoint 4

function updateTaskPriority(taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = updateTaskPriority(taskId, priority);
  res.json(result);
});

// Endpoint 5

function updateTaskText(taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = updateTaskText(taskId, text);
  res.json(result);
});

// Endpoint 6

function deleteTaskById(taskId, tasks) {
  return tasks.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((tasks) => deleteTaskById(taskId, tasks));
  res.json(result);
});

// Endpoint 7

function filterTasksByPriority(tasks, priority) {
  return tasks.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((tasks) => filterTasksByPriority(tasks, priority));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
