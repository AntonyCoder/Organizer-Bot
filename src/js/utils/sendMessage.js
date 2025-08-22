import Message from "../components/Message/Message";
import { fetchMessage } from "./api";
import { qs } from "./dom";

//Отправка сообщения 
export default async function sendMessage(event, type) {
    event.preventDefault();

    try {
        const { messageContent, currentType } = checkMessageType(event, type);
        if (!messageContent) return;

        await fetchMessage(currentType, messageContent);

        const message = new Message(currentType, messageContent);
        const messageItem = message.createMessage();

        const chatArea = qs('.chat-area');

        chatArea.appendChild(messageItem);
        chatArea.scrollTop = chatArea.scrollHeight;

    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
    }

}

//Проверка типа сообщения и возвращение соответствующего messageContent
function checkMessageType(event, type = null) {
    let messageContent;
    let currentType;

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

    return { messageContent, currentType };
}