document.addEventListener('DOMContentLoaded', function() {
    const chatHeader = document.getElementById('chat-header');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatWidget = document.getElementById('chat-widget');

    // Отправить приветственное сообщение сразу после загрузки страницы
    appendMessage("Здравствуйте! Я готов ответить на ваши вопросы о продуктах школы и помочь вам выбрать лучшее решение. Меня можно свернуть, нажав на мое имя", 'bot-message');

    chatHeader.addEventListener('click', () => {
        chatWidget.classList.toggle('minimized');
    });

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText) {
            appendMessage(messageText, 'user-message');
            userInput.value = '';
            fetchBotResponse(messageText);
        }
    }

    function appendMessage(text, className) {
        const message = document.createElement('div');
        message.className = `message ${className}`;
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Автоматическая прокрутка к последнему сообщению
    }
    
    function fetchBotResponse(userMessage) {
        fetch('https://periodic-electric-harmony.glitch.me/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data); // Для отладки
            if (data.response) {
                appendMessage(data.response, 'bot-message');
            } else {
                appendMessage('Не удалось получить ответ от бота.', 'bot-message');
            }
        })
        .catch(error => {
            console.error('Ошибка при получении ответа от бота:', error);
            appendMessage('Произошла ошибка при запросе.', 'bot-message');
        });
    }
});
