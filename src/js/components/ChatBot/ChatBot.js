import './ChatBot.scss';
import { createElement, qs } from '../../utils/dom';
import Header from '../header/Header';

export default class ChatBot {
    constructor(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('Это не является HTML элементом');
        }

        this.container = container;
        this._renderChat();
    }

    //Отрисовка основного блока всего чатбота
    _renderChat() {
        const chatBot = createElement('div', ['chat-bot']);

        const header = new Header();

        chatBot.append(header.getElement());

        this.container.appendChild(chatBot);
    }
}