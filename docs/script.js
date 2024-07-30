console.log('Script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const chatHeader = document.getElementById('chat-header');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatWidget = document.getElementById('chat-widget');

    console.log('Elements:', chatHeader, sendButton, userInput, chatMessages, chatWidget);

    // Отправить приветственное сообщение сразу после загрузки страницы
    console.log('Appending welcome message');
    appendMessage("Здравствуйте! Я готов ответить на ваши вопросы о продуктах школы и помочь вам выбрать лучшее решение. Меня можно свернуть, нажав на мое имя", 'bot-message');

    chatHeader.addEventListener('click', () => {
        console.log('Header clicked');
        chatWidget.classList.toggle('minimized');
    });

    sendButton.addEventListener('click', () => {
        console.log('Send button clicked');
        sendMessage();
    });

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText) {
            console.log('Sending message:', messageText);
            appendMessage(messageText, 'user-message');
            userInput.value = '';
            fetchBotResponse(messageText);
        } else {
            console.log('Message text is empty');
        }
    }

    function appendMessage(text, className) {
        const message = document.createElement('div');
        message.className = `message ${className}`;
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Автоматическая прокрутка к последнему сообщению
        console.log(`Appended message: ${text} with class: ${className}`);
    }
    
    function fetchBotResponse(userMessage) {
        console.log('Fetching bot response for message:', userMessage);
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
