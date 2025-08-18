import './ChatArea.scss';
import { createElement } from '../../utils/dom';
import loadData from '../../utils/api';
import Message from '../Message/Message';
import uploadFile from '../../utils/fileEvent';

export default class ChatArea {
    constructor(){
        uploadFile();
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

    //Отрисовка сообщения
    async _renderMessage() {
        try {
            const messages = await loadData();
            messages.forEach(item => {
                const message = new Message(item.type, item.text);
                const messageItem = message.createMessage();
                this.chatArea.appendChild(messageItem);
            })
        } catch (error) {
            console.error(error);
        }
    }
}