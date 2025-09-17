const express = require("express");
const router = express.Router();

let tasks = [
    { id: 1, isCompleted: false, description: "Walk the dog" },
    { id: 2, isCompleted: true, description: "Study express" },
    { id: 3, isCompleted: true, description: "Buy groceries" },
];

router.use((req, res, next) => {
  if ((req.method === "POST" || req.method === "PUT")) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Body is required" });
    }

    const { description, isCompleted } = req.body;
    if (typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ error: "Description is required and must be a string" });
    }
    if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
      return res.status(400).json({ error: "isCompleted must be a boolean" });
    }
  }
  next();
});

router.post("/tasks", (req, res) => {
    const {description, isCompleted} = req.body;
    const newTask = {
        id: tasks.length + 1,
        description,
        isCompleted: isCompleted || false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully" });
});

router.put("/task/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if(!task) return res.status(404).json({message: "Task not Found"});

    const {description, isCompleted} = req.body;
    if(description !== undefined) task.description = description;
    if(isCompleted !== undefined) task.isCompleted = isCompleted;

    res.json(task);
});

module.exports = router;    