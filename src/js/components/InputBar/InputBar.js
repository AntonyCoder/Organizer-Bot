import './InputBar.scss';
import attachment from '../../../assets/svg/attachment.svg';
import smile from '../../../assets/svg/smile-circle.svg';
import microphone from '../../../assets/svg/microphone.svg';
import { createElement } from '../../utils/dom';

export default class InputBar {
    constructor() {
        this.inputBar = this._renderInputBar();
    }

    //Получение элемента 
    getElement() {
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

        messageForm.append(addFileButton, messageInput, addSmileButton, addVoiceButton);

        inputBar.appendChild(messageForm);

        return inputBar;
    }

    //Создание кнопки добавления файлов
    _createFileButton() {
        const addFileLabel = createElement('label', ['add-file-label']);

        const addFileInput = createElement('input', ['add-file-input']);
        addFileInput.type = 'file';
        addFileInput.hidden
        const fileIcon = createElement('img', ['file-icon', 'icon']);
        fileIcon.src = attachment;

        addFileLabel.append(addFileInput, fileIcon);

        return addFileLabel;
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