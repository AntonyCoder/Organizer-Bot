import Message from "../components/Message/Message";
import { fetchMessage } from "./api";
import { qs } from "./dom";
import dayjs from "dayjs";

//Отправка сообщения 
export default async function sendMessage(event, type) {
    event.preventDefault();

    try {
        const { currentType, messageContent } = checkMessageType(event, type);

        if (!messageContent) return;
        const messageTime = getMessageTime();
        console.log(messageTime);

        await fetchMessage(currentType, messageContent, messageTime);

        const message = new Message(currentType, messageContent, messageTime);
        const messageItem = message.createMessage();

        const chatArea = qs('.chat-area');

        chatArea.appendChild(messageItem);
        chatArea.scrollTop = chatArea.scrollHeight;

    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
    }

}

//Проверка типа сообщения и возвращение соответствующего messageContent и currentType
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
        console.log(currentType);
        event.target.value = '';
    }

    return { currentType, messageContent };
}

function getMessageTime(){
   const time = dayjs().format('HH:mm');
   return time;
}