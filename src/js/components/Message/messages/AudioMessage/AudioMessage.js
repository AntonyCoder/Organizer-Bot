import { createElement } from "../../../../helpers/dom";
import MessageTime from "../MessageTime/MessageTime";
import './AudioMessage.scss';

export default class AudioMessage {
    constructor(content, time) {
        this.content = content;
        this.time = time
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block', 'audio']);
        const messageTime = MessageTime(this.time);

        const messageAudio = createElement('audio', ['message-audio']);
        messageAudio.controls = true;
        
        this._setUrl(messageAudio, this.content)

        messageBlock.append(messageAudio, messageTime);
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