var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('public'));

var tasks = [
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' }
];

app.get('/tasks', function (req, res) {
    res.json(tasks);
});

app.post('/tasks', function (req, res) {
    var newTask = { id: tasks.length + 1, text: req.body.text };
    tasks.push(newTask);
    res.json(newTask);
});

app.put('/tasks/:id', function (req, res) {
    var taskId = parseInt(req.params.id);
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (task) {
        task.text = req.body.text;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/tasks/:id', function (req, res) {
    var taskId = parseInt(req.params.id);
    tasks = tasks.filter(function (t) { return t.id !== taskId; });
    res.status(204).end();
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});
