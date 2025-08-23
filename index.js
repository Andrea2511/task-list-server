const express = require("express");
const app = express();
const port = 3000;

app.get('/task', (req, res) => {
    const task = [
        {id: 1, isCompleted: false, description: 'Walk the dog'},
        {id: 2, isCompleted: true, description: 'Study express'},
        {id: 3, isCompleted: true, description: 'Buy groceries'},
    ];
    res.json(task);
});

app.listen(port, (req, res ) => {
    console.log('Server running on port ${port}');
});