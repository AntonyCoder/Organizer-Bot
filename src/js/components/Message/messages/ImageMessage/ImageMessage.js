import { createElement } from "../../../../utils/dom";
import MessageTime from "../MessageTime/MessageTime";
import './ImageMessage.scss';

export default class ImageMessage {
    constructor(content) {
        this.content = content;
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block']);
        const messageTime = MessageTime();

        const messageImage = createElement('img', ['message-image']);
        messageImage.src = URL.createObjectURL(this.content);

        messageBlock.append(messageImage, messageTime);
        return messageBlock;
    }
}