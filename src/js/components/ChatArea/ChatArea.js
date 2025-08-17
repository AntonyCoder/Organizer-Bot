import './ChatArea.scss';
import { createElement } from '../../utils/dom';

export default class ChatArea {
    constructor() {

    }

    getElement() {
        return this._renderChatArea();
    }

    _renderChatArea() {
        const chatArea = createElement('div', ['chat-area']);

        return chatArea;
    }
}