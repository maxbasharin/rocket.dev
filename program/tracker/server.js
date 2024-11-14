const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Получение задач
app.get('/todos', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }
        res.json(JSON.parse(data));
    });
});

// Добавление задачи
app.post('/todos', (req, res) => {
    const newTodo = req.body;
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка чтения файла');
        }
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile('data.json', JSON.stringify(todos), (err) => {
            if (err) {
                return res.status(500).send('Ошибка записи файла');
            }
            res.status(201).json(newTodo);
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
