import './Message.scss';
import ImageMessage from './messages/ImageMessage/ImageMessage';
import TextMessage from './messages/TextMessage/TextMessage';

export default class Message {
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }

    //Создание сообщения в зависимости от его типа
    createMessage() {
        if (this.type === 'text') {
            const newMessage = new TextMessage(this.content);
            const messageBlock = newMessage.render();

            return messageBlock;
        }

        if(this.type === 'image'){
            const newMessage = new ImageMessage(this.content);
            const messageBlock = newMessage.render();
            return messageBlock;
        }
    }

}