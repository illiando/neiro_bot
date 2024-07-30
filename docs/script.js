document.addEventListener('DOMContentLoaded', function() {
    const chatHeader = document.getElementById('chat-header');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatWidget = document.getElementById('chat-widget');

    // Показать виджет через 5 секунд после загрузки страницы
    setTimeout(() => {
        chatWidget.classList.add('show');
        // Отправить приветственное сообщение через 2 секунды после появления виджета
        setTimeout(() => {
            appendMessage("Привет! Я готов помочь написать тебе рекламный текст для проекта Нейропрофи. Напиши мне что-нибудь", 'bot-message');
        }, 2000);
    }, 5000);

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
        fetch('https://coconut-mica-diplodocus.glitch.me/api/chat', {
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
