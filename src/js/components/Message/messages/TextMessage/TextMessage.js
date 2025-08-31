import './TextMessage.scss';
import { createElement } from "../../../../helpers/dom";
import MessageTime from "../MessageTime/MessageTime";
import linkifyText from '../../messageScripts/linkifyText';

export default class TextMessage {
    constructor(id, content, time) {
        this.content = content;
        this.time = time;
        this.id = id;
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block']);
        messageBlock.setAttribute('data-id', this.id);
        const messageTime = MessageTime(this.time);

        const messageContent = linkifyText(this.content);

        const messageText = createElement('p', ['message-text'])
        messageText.appendChild(messageContent);

        messageBlock.append(messageText, messageTime);
        return messageBlock;
    }
}