import './TextMessage.scss';
import { createElement } from "../../../../helpers/dom";
import MessageTime from "../MessageTime/MessageTime";

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

        const messageContent = this._linkify(this.content);

        const messageText = createElement('p', ['message-text'])
        messageText.appendChild(messageContent);

        messageBlock.append(messageText, messageTime);
        return messageBlock;
    }

    //Создание текста с кликабельными ссылками
    _linkify(text) {
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        text.replace(urlPattern, (match, _, offset) => {
            if (lastIndex < offset) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)))
            }

            const link = createElement('a', ['message-link']);
            link.href = match;
            link.textContent = match;
            link.target = '_blank';
            fragment.appendChild(link);

            lastIndex = offset + match.length;
        })

        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        return fragment;
    }
}