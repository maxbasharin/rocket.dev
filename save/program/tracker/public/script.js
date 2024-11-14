document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    // Функция для загрузки задач
    function loadTodos() {
        fetch('/todos')
            .then(response => response.json())
            .then(todos => {
                todoList.innerHTML = '';
                todos.forEach(todo => {
                    const li = document.createElement('li');
                    li.textContent = todo.title;
                    todoList.appendChild(li);
                });
            });
    }

    // Функция для добавления задачи
    addTodoButton.addEventListener('click', () => {
        const todoTitle = todoInput.value;
        if (todoTitle === '') return;

        const newTodo = { title: todoTitle };

        fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })
            .then(response => response.json())
            .then(() => {
                todoInput.value = '';
                loadTodos();
            });
    });

    // Загрузка задач при загрузке страницы
    loadTodos();
});
