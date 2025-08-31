import { createElement } from "../../../helpers/dom";

//Создание текста с кликабельными ссылками
export default function linkifyText(text) {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    text.replace(urlPattern, (match, _, offset) => {
        if (lastIndex < offset) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)))
        }

        const link = createElement('a', ['message-link']);
        link.href = match;
        link.textContent = match;
        link.target = '_blank';
        fragment.appendChild(link);

        lastIndex = offset + match.length;
    })

    if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    return fragment;
}