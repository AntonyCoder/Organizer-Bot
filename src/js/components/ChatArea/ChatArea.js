import './ChatArea.scss';
import { createElement } from '../../utils/dom';
import loadData from '../../utils/api';
import Message from '../Message/Message';
import showOverlay from '../../utils/showOverlay';

export default class ChatArea {
    constructor(){
        showOverlay();
    }

    //Получение элемента chatArea
    getElement() {
        return this._renderChatArea();
    }

    //Отрисовка элемента
    _renderChatArea() {
        this.chatArea = createElement('div', ['chat-area']);
        this._renderMessage();

        return this.chatArea;
    }

    //Отрисовка сообщений при перезагрузке страницы
    async _renderMessage() {
        try {
            const messages = await loadData();
            messages.forEach(item => {
                const message = new Message(item.type, item.messageContent);
                const messageItem = message.createMessage();
                this.chatArea.appendChild(messageItem);
            })

            this.chatArea.scrollTop = this.chatArea.scrollHeight; // прокрутка chatArea вниз, нужно доработать
        } catch (error) {
            console.error('Ошибка отрисовки сообщений при перезагрузке', error);
        }
    }
}