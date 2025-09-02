import './TextMessage.scss';
import { createElement } from "../../../../helpers/dom";
import MessageTime from "../MessageTime/MessageTime";
import linkifyText from '../../messageScripts/linkifyText';
import Prism from 'prismjs';
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript.js";

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

        const messageText = createElement('p', ['message-text']);

        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/;
        const match = this.content.match(codeBlockRegex);

        if (match) {
            const lang = match[1] || 'javascript';
            const code = match[2];

            const pre = createElement('pre', ['message-code']);
            const codeEl = createElement('code', [`language-${lang}`]);
            codeEl.textContent = code;

            pre.appendChild(codeEl);
            Prism.highlightElement(codeEl);
            messageText.appendChild(pre)

        } else {
            const messageContent = linkifyText(this.content);
            messageText.appendChild(messageContent);
        }


        messageBlock.append(messageText, messageTime);
        return messageBlock;
    }
}