document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-button").addEventListener("click", function () {
        const messageInput = document.getElementById("message-input");
        const messageText = messageInput.value;

        if (messageText) {
            sendMessage(messageText);
            messageInput.value = "";
        }
    });
});


function sendMessage(messageText) {
    const chatId = 1;
    const senderId = 1;


    const data = {
        chat: chatId,
        sender: senderId,
        content: messageText,
    };

    fetch("/messages/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Ошибка отправки сообщения");
        }
        return response.json();
    })
    .then((message) => {
    })
    .catch((error) => {
        console.error(error);
    });
}

// Функция для получения сообщений из указанного чата
function getMessages(chatId) {
    fetch(`/chats/${chatId}/messages/`, {
        method: "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Ошибка получения сообщений");
        }
        return response.json();
    })
    .then((messages) => {
        const messageList = document.querySelector(".message-list");
        messageList.innerHTML = "";

        messages.forEach((message) => {
            const messageElement = document.createElement("div");
            messageElement.textContent = `${message.sender}: ${message.content}`;
            messageList.appendChild(messageElement);
        });
    })
    .catch((error) => {
        console.error(error);
    });
}

function getChatList() {
    fetch("/chats/", {
        method: "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Ошибка получения списка чатов");
        }
        return response.json();
    })
    .then((chats) => {
        const chatList = document.querySelector(".chat-list");
        chatList.innerHTML = "";

        chats.forEach((chat) => {
            const chatElement = document.createElement("li");
            chatElement.textContent = chat.name;
            chatElement.dataset.chatId = chat.id;
            chatList.appendChild(chatElement);
        });
    })
    .catch((error) => {
        console.error(error);
    });
}

// Обработчик клика на элементе чата
document.querySelector(".chat-list").addEventListener("click", function (event) {
    if (event.target && event.target.tagName === "LI") {
        const chatId = event.target.dataset.chatId; // Получаем ID выбранного чата
        displayChatMessages(chatId); // Вызываем функцию для отображения сообщений
    }
});

// Функция для отображения сообщений выбранного чата
function displayChatMessages(chatId) {
    const messageList = document.querySelector(".message-list");
    messageList.innerHTML = "";

    fetch(`/chats/${chatId}/messages/`, {
        method: "GET",
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Ошибка получения сообщений");
        }
        return response.json();
    })
    .then((messages) => {
        messages.forEach((message) => {
            const messageElement = document.createElement("div");
            messageElement.textContent = `${message.sender}: ${message.content}`;
            messageList.appendChild(messageElement);
        });
    })
    .catch((error) => {
        console.error(error);
    });
}
