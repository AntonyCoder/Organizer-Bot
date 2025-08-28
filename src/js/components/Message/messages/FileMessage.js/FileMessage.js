import { createElement } from "../../../../utils/dom";
import MessageTime from "../MessageTime/MessageTime";
import './FileMessage.scss';
import file from './../../../../../assets/svg/file-icon.svg';

export default class FileMessage {
    constructor(content, time, name) {
        this.content = content;
        this.time = time;
        this.name = name;
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block', 'file']);
        const messageTime = MessageTime(this.time);

        const messageFile = createElement('a', ['message-file']);
        messageFile.target = '_blank';

        this._setName(messageFile, this.content, this.name);

        const fileIconWrapper = createElement('div', ['file-icon-wrapper']);
        const fileIcon = createElement('img', ['file-message-icon']);
        fileIcon.src = file;

        fileIconWrapper.appendChild(fileIcon);

        this._setUrl(messageFile, this.content);

        messageFile.prepend(fileIconWrapper)

        messageBlock.append(messageFile, messageTime);
        return messageBlock;
    }
//Установка URL файла
    _setUrl(message, path){
        if (path instanceof File) {
            message.href = URL.createObjectURL(path);
        } else if (typeof path === 'string') {
            message.href = `http://localhost:3000${path}`;
        }
    }

    //Установка имени файла
    _setName(message, content, fileName){
        if (!content.name) {
            fileName = this._limitName(fileName);
            message.textContent = fileName;
        } else {
            const fileName = this._limitName(content.name);
            message.textContent = fileName;
        }
    }
//Ограничение длины имени файла
    _limitName(name){
        if(name.length > 30){
            return name.slice(0, 30) + '...';
        }
        return name;
    }
}