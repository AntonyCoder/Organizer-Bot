import './ChatArea.scss';
import { createElement } from '../../helpers/dom';
import loadData from '../../utils/messageApi/api';
import Message from '../Message/Message';
import showOverlay from '../../utils/messageApi/dragDropMessage';
import { renderMessageIds } from '../../utils/messageApi/messageStore';

export default class ChatArea {
    constructor() {
        showOverlay();

        this.chatArea = null;
        this.offset = 0;
        this.limit = 10;
        this.loading = false;

        this._onScroll = this._onScroll.bind(this);
    }

    //Получение элемента chatArea
    getElement() {
        return this._renderChatArea();
    }

    //Отрисовка элемента
    _renderChatArea() {
        this.chatArea = createElement('div', ['chat-area']);
        this._loadMessage();

        this.chatArea.addEventListener('scroll', this._onScroll)

        return this.chatArea;
    }

    //Обработчик события скрола до верха страницы
    _onScroll() {
        if (this.chatArea.scrollTop === 0 && !this.loading) {
            this._loadMessage();
        }
    }

    //Отрисовка сообщений при перезагрузке страницы
    async _loadMessage() {
        if (this.loading) return;
        this.loading = true;

        try {
            const messages = await loadData(this.offset, this.limit);

            if (!messages.length) return;

            this.offset += messages.length;

            messages.reverse().forEach(item => {
                if (renderMessageIds.has(item.id)) return;
                const message = new Message(item);
                const messageItem = message.createMessage();
                this.chatArea.prepend(messageItem);

                renderMessageIds.add(item.id);
            })

            if (this.offset === messages.length) {
                setTimeout(() => {
                    this.chatArea.scrollTop = this.chatArea.scrollHeight;
                }, 1000);
            }


        } catch (error) {
            console.error('Ошибка отрисовки сообщений при перезагрузке', error);
        } finally {
            this.loading = false;
        }
    }
}