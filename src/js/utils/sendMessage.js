import Message from "../components/Message/Message";
import { fetchMessage } from "./api";
import { qs } from "./dom";
import dayjs from "dayjs";
import { faker } from '@faker-js/faker';
import { renderMessageIds } from "./messageStore";

//Отправка сообщения 
export default async function sendMessage(event, type) {
    try {
        const newMessage = checkMessageType(event, type);
        if (!newMessage.messageContent) return;

        await fetchMessage(newMessage);
        console.log(newMessage);

        const message = new Message(newMessage);
        const messageItem = message.createMessage();

        const chatArea = qs('.chat-area');

        chatArea.appendChild(messageItem);

        renderMessageIds.add(newMessage.id);
        setTimeout(() => {
            chatArea.scrollTop = chatArea.scrollHeight;
        }, 100);

    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
    }
}

//Проверка типа сообщения и возвращение соответствующего messageContent и currentType
function checkMessageType(event, type = null) {
    let messageContent;
    let currentType;

    if (event instanceof File) {
        messageContent = event;
        currentType = messageContent.type.split('/')[0];
    } else {
        event.preventDefault();

        if (type === 'text') {
            const messageInput = event.target.elements.message;
            messageContent = messageInput.value.trim();
            currentType = type;

            event.target.reset();
        }

        if (type === null) {
            messageContent = event.target.files[0];
            currentType = messageContent.type.split('/')[0];
            event.target.value = '';
        }
    }

    const message = getMessage(currentType, messageContent);

    return message;
}

//Получение времени отправки сообщения
function getMessageTime() {
    const time = dayjs().format('HH:mm');
    return time;
}

//Создание объекта сообщения с параметрами
function getMessage(type, messageContent) {
    const time = getMessageTime();

    const message = {
        id: faker.string.uuid(),
        type,
        messageContent,
        time,
        name: messageContent.name || null
    }

    return message;
}