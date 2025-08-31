import { createElement } from "../../../../helpers/dom";
import MessageTime from "../MessageTime/MessageTime";
import setUrl from "../../messageScripts/setUrl";
import './AudioMessage.scss';

export default class AudioMessage {
    constructor(id, content, time) {
        this.id = id;
        this.content = content;
        this.time = time
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block', 'audio']);
        messageBlock.setAttribute('data-id', this.id);
        const messageTime = MessageTime(this.time);

        const messageAudio = createElement('audio', ['message-audio']);
        messageAudio.controls = true;
        
        setUrl(messageAudio, this.content)

        messageBlock.append(messageAudio, messageTime);
        return messageBlock;
    }
}