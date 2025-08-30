const express = require("express");
const router = express.Router();

let tasks = [
    { id: 1, isCompleted: false, description: "Walk the dog" },
    { id: 2, isCompleted: true, description: "Study express" },
    { id: 3, isCompleted: true, description: "Buy groceries" },
];

router.get("/task", (req, res) =>{
    res.json(tasks);
});

router.get("/task/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    task ? res.json(task) : res.status(404).json({message: "Task not found"});
});

router.get("/task/filter/:status", (req, res) =>{
    const status = req.params.status === "completed";
    const filtered = tasks.filter(t => t.isCompleted === status);
    res.json(filtered);
});

module.exports = router;
