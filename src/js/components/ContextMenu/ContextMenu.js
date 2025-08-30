import './ContextMenu.scss'
import { createElement, qs } from '../../helpers/dom';
import pin from '../../../assets/img/pin.png'

export default class ContextMenu {
    constructor(event) {
        this.event = event;
        this.contextMenu = null;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    //Отрисовка контекстного меню
    showContextMenu() {
        this.contextMenu = this._createContextMenu();
        document.body.append(this.contextMenu);

        this.setOrientation(this.contextMenu);

        requestAnimationFrame(() => {
            this.contextMenu.classList.add('show');
        });

        document.addEventListener('click', this.handleClickOutside);
        document.addEventListener('keydown', this.handleKeyDown)
    }

    //Создание контекстного меню
    _createContextMenu() {
        const contextMenu = createElement('div', ['context-menu']);

        const contextMenuItem = createElement('div', ['context-menu-item']);

        const pinIcon = createElement('img', ['pin-icon', 'icon'])
        pinIcon.src = pin;
        const pinButton = createElement('button', ['pin-button'], 'Закрепить');

        contextMenuItem.append(pinIcon, pinButton);

        contextMenu.append(contextMenuItem);

        return contextMenu;
    }

    //Установка корректного расположения
    setOrientation(contextMenu) {
        let x = this.event.pageX;
        let y = this.event.pageY;

        const menuWidth = contextMenu.offsetWidth;
        const menuHeight = contextMenu.offsetHeight;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        if (x + menuWidth > winWidth) {
            x = winWidth - menuWidth - 5;
        }

        if (y + menuHeight > winHeight) {
            y = winHeight - menuHeight - 5;
        }

        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
    }

    //Обработчик клика мне элемента контекстного меню
    handleClickOutside(e) {
        if (this.contextMenu && !this.contextMenu.contains(e.target)) {
            this.removeContextMenu();
        }
    }

    //Обработчик нажатия на Escape
    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.removeContextMenu();
        }
    }

    //Удаление контекстного меню
    removeContextMenu() {
        if (this.contextMenu) {
            this.contextMenu.classList.remove('show');

            this.contextMenu.addEventListener('transitionend', () => {
                if (this.contextMenu) {
                    this.contextMenu.remove();
                    this.contextMenu = null;
                }
            }, { once: true })

            document.removeEventListener('click', this.handleClickOutside);
            document.removeEventListener('keydown', this.handleKeyDown);
        }
    }
}