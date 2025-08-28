export default function toggleClassName(trigger, element, className) {
    document.addEventListener('click', (e) => {
        if (e.target !== trigger && !element.contains(e.target)) {
            removeClass(element, className)
        }
    })

    trigger.addEventListener('click', () => {
        if (element.classList.contains(className)) {
            removeClass(element, className)
        } else {
            element.classList.add(className);
        }

    })
}

function removeClass(element, className) {
    element.classList.remove(className);
    if (element.tagName === 'INPUT') {
        element.value = '';
    }
}