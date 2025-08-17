import './TextMessage.scss';
import { createElement } from "../../../../utils/dom";
import MessageTime from "../MessageTime/MessageTime";

export default class TextMessage {
    constructor(content) {
        this.content = content;
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block']);
        const messageTime = MessageTime();
        let messageContent;

        if (this.content.startsWith('http://') || this.content.startsWith('https://')) {
            messageContent = createElement('a', ['message-content'], this.content);
            messageContent.href = this.content;
            messageContent.target = 'blank';
        } else {
            messageContent = createElement('p', ['message-content'], this.content);
            messageBlock.append(messageContent, messageTime);
        }
        
        messageBlock.append(messageContent, messageTime);
        return messageBlock;
    }
}