import './Message.scss';
import TextMessage from './messages/TextMessage/TextMessage';

export default class Message {
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }

    createMessage() {
        if (this.type === 'text') {
            const newMessage = new TextMessage(this.content);
            const messageBlock = newMessage.render();

            return messageBlock;
        }
    }

}