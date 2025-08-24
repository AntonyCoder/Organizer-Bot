import { createElement } from "../../../../utils/dom";
import MessageTime from "../MessageTime/MessageTime";
import './VideoMessage.scss';

export default class AudioMessage {
    constructor(content, time) {
        this.content = content;
        this.time = time
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block', 'video']);
        const messageTime = MessageTime(this.time);

        const messageVideo = createElement('video', ['message-video']);
        messageVideo.controls = true;
        
        this._setUrl(messageVideo, this.content);

        messageBlock.append(messageVideo, messageTime);
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