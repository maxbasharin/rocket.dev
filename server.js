const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/tasks', (req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }
        res.send(data);
    });
});

app.post('/save-tasks', (req, res) => {
    const tasks = req.body.tasks;
    fs.writeFile('tasks.json', JSON.stringify({ tasks }), (err) => {
        if (err) {
            return res.status(500).send('Ошибка записи файла');
        }
        res.send('Задачи сохранены');
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
