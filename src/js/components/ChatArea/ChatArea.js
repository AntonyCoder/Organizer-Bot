import './ChatArea.scss';
import { createElement, qs } from '../../helpers/dom';
import loadData from '../../utils/messageApi/api';
import Message from '../Message/Message';
import showOverlay from '../../utils/messageApi/dragDropMessage';
import { renderMessageIds } from '../../utils/messageApi/messageStore';
import messageActions from '../../utils/messageActions/messageActions';
import ContextMenu from '../ContextMenu/ContextMenu';
import PinMessage from '../PinMessage/PinMessage';
import { getPinnedMessage } from '../../utils/messageApi/messageStore';

export default class ChatArea {
    constructor() {
        showOverlay();//Отображение затемненного фона при перетаскивании файла

        this.chatArea = null;
        this.offset = 0;
        this.limit = 10;
        this.loading = false;

        this._onScroll = this._onScroll.bind(this);

        this.contextMenu = new ContextMenu(this._setPinMessage.bind(this));//Передаем callback который сработает при нажатии на кнопку закрепить и передаст обратно информацию о сообщении
        this.pinMessage = new PinMessage();
    }

    //Инициализация компонента
    init() {
        this.chatArea = this._renderChatArea();
        this._attachEvents();

        return this.chatArea;
    }

    //Callback который сработает при нажатии на кнопку закрепить сообщение и создаст закрепленное сообщение
    _setPinMessage(messageData) {
        if (getPinnedMessage()) return

        const pinElement = this.pinMessage.createPinMessage(messageData);
        
        this.chatArea.append(pinElement);
    }

    //Отрисовка элемента
    _renderChatArea() {
        const element = createElement('div', ['chat-area']);
        this._loadMessage();

        const pinned = getPinnedMessage();
        if (pinned) {
            const pinElement = this.pinMessage.createPinMessage(pinned);
            element.append(pinElement);
        }

        return element;
    }

    //Подключаем обработчики событий
    _attachEvents() {
        this.chatArea.addEventListener('scroll', this._onScroll);
        this.chatArea.addEventListener('contextmenu', (e) => messageActions(e, this.contextMenu))
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

                renderMessageIds.set(item.id, item);
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