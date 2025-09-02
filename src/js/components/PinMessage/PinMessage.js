import './PinMessage.scss';
import closeIcon from '../../../assets/img/close-icon.png';
import { createElement, qs } from '../../helpers/dom';
import { setPinnedMessage, clearPinnedMessage } from '../../utils/messageApi/messageStore';
import limitContent from '../../helpers/limitContent';

export default class PinMessage {
    constructor() {
        this._unPinMessage = this._unPinMessage.bind(this);
        this._highlightMessage = this._highlightMessage.bind(this);
    }

    //Создание элемента закрепленного сообщения
    createPinMessage(msg) {
        setPinnedMessage(msg);

        this.pinMessageWrapper = createElement('div', ['pin-message-wrapper']);

        const pinMain = this._createPinContent(msg);

        const unpinButton = createElement('button', ['unpin-button']);
        const unpinIcon = createElement('img', ['unpin-icon']);
        unpinIcon.src = closeIcon;

        unpinButton.append(unpinIcon);
        unpinButton.addEventListener('click', this._unPinMessage);

        this.pinMessageWrapper.append(pinMain, unpinButton);

        this.pinMessageWrapper.addEventListener('click', (e) => {
            this._highlightMessage(e, msg.id);
        });

        return this.pinMessageWrapper;
    }

    //Создание основного блока закрепленного сообщения в зависимости от типа сообщения
    _createPinContent(msg) {
        const pinBlock = createElement('div', ['pin-block']);
        const pinMessageTitle = createElement('p', ['pin-message-title'], 'Pinned message');
        let pinMessageText;

        if (msg.type === 'text') {
            pinMessageText = createElement('p', ['pin-message-content'], limitContent(msg.messageContent, 100));
        } else if (msg.type === 'application') {
            pinMessageText = createElement('p', ['pin-message-content'], limitContent(msg.name, 100));
        } else {
            pinMessageText = createElement('p', ['pin-message-content'], msg.type);
        }

        pinBlock.append(pinMessageTitle, pinMessageText);

        return pinBlock;
    }

    //Удаление закрепленного сообщения
    _unPinMessage() {
        this.pinMessageWrapper.remove();
        clearPinnedMessage();
    }

    //Подсветка закрепленного сообщения
    _highlightMessage(e, msgId) {
        if (e.target.closest('button')) return

        const targetMessage = qs(`[data-id="${msgId}"]`);
        if (!targetMessage) {
            return
        }
        targetMessage.classList.add('highlight');

        targetMessage.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        setTimeout(() => {
            targetMessage.classList.remove('highlight');
        }, 2000)
    }
}