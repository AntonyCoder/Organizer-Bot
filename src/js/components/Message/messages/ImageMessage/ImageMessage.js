import { createElement } from "../../../../helpers/dom";
import MessageTime from "../MessageTime/MessageTime";
import setUrl from "../../messageScripts/setUrl";
import './ImageMessage.scss';

export default class ImageMessage {
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

        const messageImage = createElement('img', ['message-image']);
        
        setUrl(messageImage, this.content)

        messageBlock.append(messageImage, messageTime);
        return messageBlock;
    }

}