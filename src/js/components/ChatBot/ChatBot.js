import './ChatBot.scss';
import { createElement, qs } from '../../utils/dom';
import Header from '../header/Header';
import ChatArea from '../chatArea/ChatArea';
import InputBar from '../InputBar/InputBar';
import Message from '../Message/Message';
import { fetchMessage } from '../../utils/api';

export default class ChatBot {
    constructor(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('Это не является HTML элементом');
        }

        this.container = container;
        this._sendMessage = this._sendMessage.bind(this)
        this._init();
    }

    //Инициализация
    _init() {
        this._renderChat();

        const messageForm = qs('.message-form');
        messageForm.addEventListener('submit', this._sendMessage);
    }

    //Отрисовка основного блока всего чатбота
    _renderChat() {
        const chatBot = createElement('div', ['chat-bot']);

        const header = new Header();
        const headerElement = header.getElement();

        const chatArea = new ChatArea();
        this.chatAreaElement = chatArea.getElement();

        const inputBar = new InputBar();
        const inputBarElement = inputBar.getElement();

        chatBot.append(headerElement, this.chatAreaElement, inputBarElement);

        this.container.appendChild(chatBot);
    }

    //Отправка текстового сообщения
    async _sendMessage(e) {
        e.preventDefault();
        const messageInput = e.target.elements.message;
        const messageText = messageInput.value.trim();

        if (!messageText) {
            e.target.reset();
            return;
        }

        fetchMessage('text', messageText);

        const message = new Message('text', messageText);
        const messageItem = message.createMessage();

        e.target.reset();

        this.chatAreaElement.appendChild(messageItem);
        this.chatAreaElement.scrollTop = this.chatAreaElement.scrollHeight;
    }
}