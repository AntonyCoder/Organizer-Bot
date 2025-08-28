import { createElement, qs } from "../../helpers/dom";
import sendMessage from "./sendMessage";

//Функция управления отображением затемненного фона
export default function showOverlay() {
    document.addEventListener('DOMContentLoaded', () => {

        let dragCounter = 0;
        const chatArea = qs('.chat-area');
        const dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];

        dragEvents.forEach(event => {
            chatArea.addEventListener(event, preventDefaults);
        });

        chatArea.addEventListener('dragenter', () => {
            dragCounter++;
            renderOverlay(chatArea);
        })

        chatArea.addEventListener('dragleave', () => {
            dragCounter--;
            if (dragCounter === 0) {
                removeOverlay(chatArea);
            }
        })

        chatArea.addEventListener('drop', (e) => {
            dragCounter = 0;
            removeOverlay(chatArea);
            handleDrop(e);
        })
    })
}

//Добавление затемненного фона
function renderOverlay(chatArea) {
    let chatOverlay = qs('.chat-overlay', chatArea);
    if (!chatOverlay) {
        const chatOverlay = createElement('div', ['chat-overlay']);
        const chatOverlayText = createElement('p', ['chat-overlay-text'], 'Drop files here');

        chatOverlay.appendChild(chatOverlayText);

        chatArea.appendChild(chatOverlay);
    } else {
        chatOverlay.style.height = chatArea.scrollHeight + "px";
        chatOverlay.style.display = 'flex';
    }
}

//Скрытие затемненного фона
function removeOverlay(chatArea) {
    let chatOverlay = qs('.chat-overlay', chatArea);
    if (chatOverlay) {
        chatOverlay.style.display = 'none';
    }
}

//Функция предотвращения событий по умолчанию
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

//Обработка добавления файла
function handleDrop(e) {
    const data = e.dataTransfer;
    const files = data.files;
    sendMessage(files[0]);
}