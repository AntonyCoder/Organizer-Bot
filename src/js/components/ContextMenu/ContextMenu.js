import './ContextMenu.scss'
import { createElement, qs } from '../../helpers/dom';
import pin from '../../../assets/img/pin.png'

export default class ContextMenu {
    constructor(onPin) {
        this.contextMenu = null;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this._onPinButton = this._onPinButton.bind(this);

        this.onPin = onPin;
        this.pinButton = null;
    }

    //Отображение контекстного меню
    showContextMenu(event, targetMessage) {
        this.contextMenu = this._createContextMenu();
        document.body.append(this.contextMenu);

        this.setOrientation(this.contextMenu, event);

        this.pinButton = qs('.pin-button');
        this.pinButton.addEventListener('click', () => this._onPinButton(targetMessage))

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

        const pinIcon = createElement('img', ['pin-icon', 'icon']);
        pinIcon.src = pin;
        this.pinButton = createElement('button', ['pin-button'], 'Закрепить');

        contextMenuItem.append(pinIcon, this.pinButton);

        contextMenu.append(contextMenuItem);

        return contextMenu;
    }

    //Обработчик нажатия на кнопку закрепить
    _onPinButton(targetMessage) {

        if(this.onPin){
            this.onPin(targetMessage);
        }
    
        this.removeContextMenu();
    }

    //Установка корректного расположения контекстного меню
    setOrientation(contextMenu, event) {
        let x = event.pageX;
        let y = event.pageY;

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

    //Обработчик клика вне элемента контекстного меню
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