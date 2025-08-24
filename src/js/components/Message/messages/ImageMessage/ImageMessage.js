import { createElement } from "../../../../utils/dom";
import MessageTime from "../MessageTime/MessageTime";
import './ImageMessage.scss';

export default class ImageMessage {
    constructor(content, time) {
        this.content = content;
        this.time = time;
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block']);
        const messageTime = MessageTime(this.time);

        const messageImage = createElement('img', ['message-image']);
        if (this.content instanceof File) {
            messageImage.src = URL.createObjectURL(this.content);
        } else if (typeof this.content === 'string') {
            messageImage.src = `http://localhost:3000${this.content}`;
        }

        messageBlock.append(messageImage, messageTime);
        return messageBlock;
    }
}