import './ChatBot.scss';
import { createElement, qs } from '../../helpers/dom';
import Header from '../header/Header';
import ChatArea from '../chatArea/ChatArea';
import InputBar from '../InputBar/InputBar';
import sendMessage from '../../utils/messageApi/sendMessage';

export default class ChatBot {
    constructor(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('Это не является HTML элементом');
        }

        this.container = container;
        this._init();
    }

    //Инициализация
    _init() {
        this._renderChat();

        const messageForm = qs('.message-form');

        // Отправка текстового сообщения
        messageForm.addEventListener('submit', (e) => sendMessage(e, 'text'));

        // Отправка иных типов сообщений
        messageForm.addEventListener('change', (e) => {
            if (e.target.type === 'file') {
                sendMessage(e);
            } else return
        });

        // Отправка местоположения
        messageForm.addEventListener('click', (e) => {
            if (e.target.matches('.location-input')) {
                sendMessage(e, 'location');
            } else return
        });
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
}