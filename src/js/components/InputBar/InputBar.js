import './InputBar.scss';
import attachment from '../../../svg/attachment.svg';
import smile from '../../../svg/smile-circle.svg';
import microphone from '../../../svg/microphone.svg';
import { createElement } from '../../utils/dom';

export default class InputBar {
    constructor() {
        this.inputBar = this._renderInputBar();
    }

    getElement() {
        return this.inputBar;
    }

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

    _createFileButton() {
        const addFileButton = createElement('button', ['add-file-button']);
        addFileButton.type = 'button';
        const fileIcon = createElement('img', ['file-icon', 'icon']);
        fileIcon.src = attachment;

        addFileButton.appendChild(fileIcon);

        return addFileButton;
    }

    _createMessageInput() {
        const messageInput = createElement('input', ['message-input']);
        messageInput.type = 'text';
        messageInput.placeholder = 'Write a message...';
        messageInput.name = 'message';

        return messageInput;
    }

    _createSmileButton() {
        const addSmileButton = createElement('button', ['add-smile-button']);
        addSmileButton.type = 'button';
        const smileIcon = createElement('img', ['smile-icon', 'icon']);
        smileIcon.src = smile;

        addSmileButton.appendChild(smileIcon);

        return addSmileButton;
    }

    _createVoiceButton() {
        const addVoiceButton = createElement('button', ['add-voice-button']);
        addVoiceButton.type = 'button';
        const voiceIcon = createElement('img', ['voice-icon', 'icon']);
        voiceIcon.src = microphone;

        addVoiceButton.appendChild(voiceIcon);

        return addVoiceButton;
    }
}