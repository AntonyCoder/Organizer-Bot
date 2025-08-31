import './InputBar.scss';
import attachment from '../../../assets/svg/attachment.svg';
import smile from '../../../assets/svg/smile-circle.svg';
import microphone from '../../../assets/svg/microphone.svg';
import media from '../../../assets/img/media.png';
import document from '../../../assets/img/document.png';
import geolocation from '../../../assets/img/geolocation.png';
import { createElement } from '../../helpers/dom';

export default class InputBar {
    constructor() {
        this.inputBar = this._renderInputBar();
    }

    //Получение элемента 
    init() {
        return this.inputBar;
    }

    //Отрисовка элемента inputBar
    _renderInputBar() {
        const inputBar = createElement('div', ['input-bar']);
        const messageForm = createElement('form', ['message-form']);

        const addFileButton = this._createFileButton();
        const messageInput = this._createMessageInput();
        const addSmileButton = this._createSmileButton();
        const addVoiceButton = this._createVoiceButton();

        const attachmentBlock = this._createAttechmentBlock();

        messageForm.append(addFileButton, attachmentBlock, messageInput, addSmileButton, addVoiceButton);

        inputBar.appendChild(messageForm);

        return inputBar;
    }

    //Создание кнопки добавления файлов
    _createFileButton() {
        const addFileLabel = createElement('label', ['add-file-label']);

        const addFileInput = createElement('input', ['add-file-input']);
        addFileInput.type = 'file';
        addFileInput.hidden = true;
        const fileIcon = createElement('img', ['file-icon', 'icon']);
        fileIcon.src = attachment;

        addFileLabel.append(addFileInput, fileIcon);

        return addFileLabel;
    }

    //Создание блока с добавлением вложений и отправки геолокации
    _createAttechmentBlock() {
        const attachmentBlock = createElement('div', ['attachment-block']);
        const attachmentList = createElement('ul', ['attachment-list']);

        //Отправка фото и видео сообщений
        const attachmentItemPhoto = createElement('li', ['attechment-item']);
        const photoLabel = createElement('label', ['attechment-label']);
        photoLabel.textContent = 'Photo or video';

        const mediaInput = createElement('input', ['media-input']);
        mediaInput.type = 'file';
        mediaInput.hidden = true;
        mediaInput.accept = 'image/*, audio/*, video/*';
        
        const photoIcon = createElement('img', ['attechment-icon', 'icon']);
        photoIcon.src = media;

        photoLabel.prepend(mediaInput, photoIcon);
        attachmentItemPhoto.appendChild(photoLabel);

        //Отправка документов и файлов
        const attachmentItemDocument = createElement('li', ['attechment-item']);
        const documentLabel = createElement('label', ['attechment-label']);
        documentLabel.textContent = 'Document';

        const documentInput = createElement('input', ['document-input']);
        documentInput.type = 'file';
        documentInput.hidden = true;
        documentInput.accept = 'application/*';

        const documentIcon = createElement('img', ['attechment-icon', 'icon']);
        documentIcon.src = document;

        documentLabel.prepend(documentInput, documentIcon);
        attachmentItemDocument.appendChild(documentLabel);

        //Отправка геолокации
        const attachmentItemLocation = createElement('li', ['attechment-item']);
        const locationLabel = createElement('label', ['attechment-label']);
        locationLabel.textContent = 'Geolocation';

        const locationInput = createElement('input', ['location-input']);
        locationInput.type = 'button';
        locationInput.hidden = true;

        const locationIcon = createElement('img', ['attechment-icon', 'icon']);
        locationIcon.src = geolocation;

        locationLabel.prepend(locationInput, locationIcon);
        attachmentItemLocation.appendChild(locationLabel);

        attachmentList.append(attachmentItemPhoto, attachmentItemDocument, attachmentItemLocation);
        attachmentBlock.appendChild(attachmentList);

        return attachmentBlock;
    }

    //Создание поля ввода текста
    _createMessageInput() {
        const messageInput = createElement('input', ['message-input']);
        messageInput.type = 'text';
        messageInput.placeholder = 'Write a message...';
        messageInput.name = 'message';
        messageInput.autocomplete = 'off';

        return messageInput;
    }

    //Создание кнопки добавления эмодзи
    _createSmileButton() {
        const addSmileButton = createElement('button', ['add-smile-button']);
        addSmileButton.type = 'button';
        const smileIcon = createElement('img', ['smile-icon', 'icon']);
        smileIcon.src = smile;

        addSmileButton.appendChild(smileIcon);

        return addSmileButton;
    }

    //Создание кнопки записи голосового сообщения
    _createVoiceButton() {
        const addVoiceButton = createElement('button', ['add-voice-button']);
        addVoiceButton.type = 'button';
        const voiceIcon = createElement('img', ['voice-icon', 'icon']);
        voiceIcon.src = microphone;

        addVoiceButton.appendChild(voiceIcon);

        return addVoiceButton;
    }
}