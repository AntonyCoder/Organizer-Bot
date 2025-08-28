import { createElement } from "../../../../helpers/dom";
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
        
        this._setUrl(messageImage, this.content)

        messageBlock.append(messageImage, messageTime);
        return messageBlock;
    }

    _setUrl(message, path){
        if (path instanceof File) {
            message.src = URL.createObjectURL(path);
        } else if (typeof path === 'string') {
            message.src = `http://localhost:3000${path}`;
        }
    }
}