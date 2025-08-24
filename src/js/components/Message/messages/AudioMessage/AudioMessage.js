import { createElement } from "../../../../utils/dom";
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
        if (this.content instanceof File) {
            messageAudio.src = URL.createObjectURL(this.content);
        } else if(typeof this.content === 'string'){
            messageAudio.src = `http://localhost:3000${this.content}`;
        }

        messageBlock.append(messageAudio, messageTime);
        return messageBlock;
    }
}