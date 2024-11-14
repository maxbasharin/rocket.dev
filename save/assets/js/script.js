const inputs = document.querySelectorAll('.password-input');
const passwordContainer = document.getElementById('password-container');
const contentFrame = document.getElementById('content-frame');
const errorMessage = document.getElementById('error-message');
const correctPassword = '3009';
const clickArea = document.getElementById('click-area');

let clickCount = 0;

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus(); // Переход к следующему полю
        }
        if (index === inputs.length - 1 && input.value.length === 1) {
            checkPassword(); // Проверка пароля, если последнее поле заполнено
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value === '') {
            if (index > 0) {
                inputs[index - 1].focus(); // Переход к предыдущему полю
            }
        }
    });
});

function checkPassword() {
    const enteredPassword = Array.from(inputs).map(input => input.value).join('');
    if (enteredPassword === correctPassword) {
        passwordContainer.classList.add('hidden');
        contentFrame.classList.remove('hidden');
        errorMessage.style.display = 'none'; // Скрываем сообщение об ошибке
    } else {
        errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
        inputs.forEach(input => input.value = ''); // Очищаем поля
        inputs[0].focus(); // Возвращаем фокус на первое поле
    }
}

// Обработчик кликов на области клика
clickArea.addEventListener('click', () => {
    clickCount++;

    // Добавляем класс для анимации подсветки
    clickArea.classList.add('active');

    // Удаляем класс через 0.5 секунды (длительность анимации)
    setTimeout(() => {
        clickArea.classList.remove('active');
    }, 500);

    if (clickCount === 4) {
        // Автоматически заполняем пароль
        inputs[0].value = '3';
        inputs[1].value = '0';
        inputs[2].value = '0';
        inputs[3].value = '9';

        checkPassword(); // Проверяем пароль
        clickCount = 0; // Сброс счетчика
    }
});

// Автоматически сосредоточьтесь на первом поле ввода
inputs[0].focus();
