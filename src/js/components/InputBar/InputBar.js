import './InputBar.scss';
import attachment from '../../../assets/svg/attachment.svg';
import smile from '../../../assets/svg/smile-circle.svg';
import microphone from '../../../assets/svg/microphone.svg';
import media from '../../../assets/img/media.png';
import document from '../../../assets/img/document.png';
import geolocation from '../../../assets/img/geolocation.png';
import { createElement, qs } from '../../helpers/dom';
import { Picker } from 'emoji-mart';
import data from '@emoji-mart/data';

export default class InputBar {
    constructor() {
        this.inputBar = this._renderInputBar();
        this._insertEmoji = this._insertEmoji.bind(this);
        this._hideEmoji = this._hideEmoji.bind(this);
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
        const messageInput = createElement('textarea', ['message-input']);
        messageInput.placeholder = 'Write a message...';
        messageInput.name = 'message';
        messageInput.autocomplete = 'off';
        messageInput.rows = 1;

        messageInput.addEventListener('input', () => {
            messageInput.style.height = 'auto';
            messageInput.style.height = `${messageInput.scrollHeight}px`;

            if (messageInput.scrollHeight > 200) {
                messageInput.style.overflowY = 'auto';
            } else {
                messageInput.style.overflowY = 'hidden';
            }
        })

        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                messageInput.form.requestSubmit();
                messageInput.style.height = 'auto';
            }
        })

        return messageInput;
    }

    //Создание кнопки добавления эмодзи
    _createSmileButton() {
        const emojiWrapper = createElement('div', ['emoji-wrapper']);

        const addSmileButton = createElement('button', ['add-smile-button']);
        addSmileButton.type = 'button';
        const smileIcon = createElement('img', ['smile-icon', 'icon']);
        smileIcon.src = smile;

        addSmileButton.appendChild(smileIcon);
        emojiWrapper.append(addSmileButton);

        emojiWrapper.addEventListener('mouseenter', (e) => this._insertEmoji(emojiWrapper, e));
        emojiWrapper.addEventListener('mouseleave', () => this._hideEmoji());

        return emojiWrapper;
    }

    //Открытие блока с эмодзи
    _insertEmoji(emojiWrapper) {
        if (this.emojiPicker) {
            return
        }

        this.emojiPicker = new Picker({
            data,
            onEmojiSelect: (emoji) => {
                const input = qs('.message-input');
                input.value += emoji.native;
            },
        })

        this.emojiPicker.classList.add('emoji-picker');
        setTimeout(() => {
            this.emojiPicker.classList.add('show');
        }, 0)

        emojiWrapper.appendChild(this.emojiPicker);
    }

    //Скрытие блока с эмодзи
    _hideEmoji() {
        if (!this.emojiPicker) return;
        this.emojiPicker.classList.remove('show');

        this.emojiPicker.addEventListener('transitionend', () => {
            if (this.emojiPicker) {
                this.emojiPicker.remove();
                this.emojiPicker = null;
                return;
            }
        }, { once: true })
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