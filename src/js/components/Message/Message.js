import './Message.scss';
import ImageMessage from './messages/ImageMessage/ImageMessage';
import TextMessage from './messages/TextMessage/TextMessage';
import AudioMessage from './messages/AudioMessage/AudioMessage';
import VideoMessage from './messages/VideoMessage/VideoMessage';
import FileMessage from './messages/FileMessage.js/FileMessage';

export default class Message {
    constructor(newMessage) {
        this.type = newMessage.type;
        this.content = newMessage.messageContent;
        this.time = newMessage.time;
        this.name = newMessage.name;
    }

    //Создание сообщения в зависимости от его типа
    createMessage() {
        if (this.type === 'text') {
            const newMessage = new TextMessage(this.content, this.time);
            const messageBlock = newMessage.render();

            return messageBlock;
        }

        if (this.type === 'image') {
            const newMessage = new ImageMessage(this.content, this.time);
            const messageBlock = newMessage.render();

            return messageBlock;
        }

        if (this.type === 'audio') {
            const newMessage = new AudioMessage(this.content, this.time);
            const messageBlock = newMessage.render();

            return messageBlock;
        }

        if (this.type === 'video') {
            const newMessage = new VideoMessage(this.content, this.time);
            const messageBlock = newMessage.render();

            return messageBlock;
        }

        if (this.type === 'application') {
            const newMessage = new FileMessage(this.content, this.time, this.name);
            const messageBlock = newMessage.render();

            return messageBlock;
        }
    }

}