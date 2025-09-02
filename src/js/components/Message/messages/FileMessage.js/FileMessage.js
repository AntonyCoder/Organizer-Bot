import { createElement } from "../../../../helpers/dom";
import MessageTime from "../MessageTime/MessageTime";
import './FileMessage.scss';
import file from './../../../../../assets/svg/file-icon.svg';
import limitName from "../../../../helpers/limitContent";
import setUrl from "../../messageScripts/setUrl";

export default class FileMessage {
    constructor(id, content, time, name) {
        this.content = content;
        this.time = time;
        this.name = name;
        this.id = id;
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block', 'file']);
        messageBlock.setAttribute('data-id', this.id);
        const messageTime = MessageTime(this.time);

        const messageFile = createElement('a', ['message-file']);
        messageFile.target = '_blank';

        this._setName(messageFile, this.content, this.name);

        const fileIconWrapper = createElement('div', ['file-icon-wrapper']);
        const fileIcon = createElement('img', ['file-message-icon']);
        fileIcon.src = file;

        fileIconWrapper.appendChild(fileIcon);

        setUrl(messageFile, this.content);

        messageFile.prepend(fileIconWrapper)

        messageBlock.append(messageFile, messageTime);
        return messageBlock;
    }

    //Установка имени файла
    _setName(message, content, fileName){
        if (!content.name) {
            fileName = limitName(fileName);
            message.textContent = fileName;
        } else {
            const fileName = limitName(content.name);
            message.textContent = fileName;
        }
    }

}