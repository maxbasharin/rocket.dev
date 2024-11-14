let questions = {};
let currentCategory = '';
let currentQuestions = [];
let currentQuestionIndex = 0;

// Загрузка вопросов из JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data.categories;
        renderCategories();
    });

function renderCategories() {
    const categoriesDiv = document.getElementById('categories');
    for (const category in questions) {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerText = category.charAt(0).toUpperCase() + category.slice(1);
        card.onclick = () => startCategory(category);
        categoriesDiv.appendChild(card);
    }
}

function startCategory(category) {
    currentCategory = category;
    currentQuestions = [...questions[category]];
    currentQuestionIndex = 0;
    document.getElementById('categories').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    showNextQuestion();
}

function showNextQuestion() {
    if (currentQuestionIndex < currentQuestions.length) {
        const currentQuestion = currentQuestions[currentQuestionIndex];
        document.getElementById('question-text').innerText = currentQuestion.question;
        document.getElementById('answer-text').innerText = ''; // Скрываем ответ
    } else {
        alert('Все вопросы отвечены!');
        resetTest();
    }
}

document.getElementById('yes-button').onclick = () => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    document.getElementById('answer-text').innerText = `Правильный ответ: ${currentQuestion.answer}`;
    currentQuestions.splice(currentQuestionIndex, 1); // Удаляем вопрос
    setTimeout(showNextQuestion, 2000); // Пауза перед следующим вопросом
};

document.getElementById('no-button').onclick = () => {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    document.getElementById('answer-text').innerText = `Правильный ответ: ${currentQuestion.answer}`;
    currentQuestionIndex++;
    setTimeout(showNextQuestion, 2000); // Пауза перед следующим вопросом
};

function resetTest() {
    document.getElementById('categories').style.display = 'block';
    document.getElementById('question-container').style.display = 'none';
    currentCategory = '';
    currentQuestions = [];
    currentQuestionIndex = 0;
}