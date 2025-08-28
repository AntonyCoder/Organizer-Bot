export function createElement(tag, className = [], content = ''){
    const el = document.createElement(tag);
    if(className.length) el.classList.add(...className)
    if(content) el.textContent = content;

    return el;
}

export function qs(selector, parent = document){
    return parent.querySelector(selector);
}