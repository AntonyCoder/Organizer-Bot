import Message from "../components/Message/Message";
import { fetchMessage } from "./api";
import { qs } from "./dom";
import dayjs from "dayjs";

//Отправка сообщения 
export default async function sendMessage(event, type) {

    try {
        const { currentType, messageContent } = checkMessageType(event, type);

        if (!messageContent) return;
        const messageTime = getMessageTime();

        await fetchMessage(currentType, messageContent, messageTime);

        const message = new Message(currentType, messageContent, messageTime);
        const messageItem = message.createMessage();

        const chatArea = qs('.chat-area');

        chatArea.appendChild(messageItem);
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

    return { currentType, messageContent };
}

//Получение времени отправки сообщения
function getMessageTime() {
    const time = dayjs().format('HH:mm');
    return time;
}