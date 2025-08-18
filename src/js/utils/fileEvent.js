import { createElement, qs } from "./dom";
//Функция управления загрузкой файлов
export default function uploadFile() {
    document.addEventListener('DOMContentLoaded', () => {

        const chatArea = qs('.chat-area');
        const dragEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
        const dragActiveEvents = ['dragenter', 'dragover'];
        const dragFinishEvents = ['dragleave', 'drop'];

        dragEvents.forEach(event => {
            chatArea.addEventListener(event, preventDefaults);
        });

        dragActiveEvents.forEach(event => {
            chatArea.addEventListener(event, () => highlightChatArea(chatArea));
        });

        dragFinishEvents.forEach(event => {
            chatArea.addEventListener(event, () => unHighlightChatArea(chatArea));
        });

        chatArea.addEventListener('drop', handleDrop)
    })
}

//Функция предотвращения событий по умолчанию
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

//Включение подстветки области перетаскивания файла
function highlightChatArea(chatArea) {
    chatArea.classList.add('highlight');
}

//Выключение подсветки области перетаскивания файла
function unHighlightChatArea(chatArea) {
    chatArea.classList.remove('highlight');
}

//Обработка добавления файла
function handleDrop(e){
    const data =  e.dataTransfer;
    const files = data.files;
    console.log(files);
}