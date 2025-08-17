import { createElement } from "../../../../utils/dom";
import MessageTime from "../MessageTime/MessageTime";

export default class TextMessage{
    constructor(content){
        this.content = content;
    }

    render(){
        const messageBlock = createElement('div', ['message-block']);
        const messageContent = createElement('p', ['message-content'], this.content);

        const messageTime = MessageTime();

        messageBlock.append(messageContent, messageTime);

        return messageBlock;
    }
}