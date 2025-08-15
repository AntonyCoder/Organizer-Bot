import './Header.scss';
import search from '../../../img/search.svg';
import sidebar from '../../../img/sidebar.svg';
import { createElement, qs } from '../../utils/dom';

export default class Header {
    constructor() {
    }

    getElement() {
        return this._renderHeader();
    }

    //Создание блока шапки всего чатбота
    _renderHeader() {
        const header = createElement('div', ['header']);
        const headerTitle = createElement('p', ['header-title'], 'Saved Messages');
        const serviceBlock = this._renderServiceBlock();

        header.append(headerTitle, serviceBlock);

        return header;
    }

    //Создание в шапке блока с сервисными кнопками поиска и открывания sidebar 
    _renderServiceBlock() {
        const serviceBlock = createElement('div', ['service-block']);

        const headerSearchWrapper = createElement('div', ['header-search-wrapper']);
        const headerSearch = createElement('input', ['header-search']);
        headerSearch.type = 'text';
        const headerSearchImage = createElement('img', ['header-search-image']);
        headerSearchImage.src = search;

        headerSearchWrapper.append(headerSearch, headerSearchImage);

        const sidebarButton = createElement('button', ['sidebar-button']);
        const sidebarButtonImage = createElement('img', ['sidebar-button-image']);
        sidebarButtonImage.src = sidebar;

        sidebarButton.appendChild(sidebarButtonImage);

        serviceBlock.append(headerSearchWrapper, sidebarButton);

        return serviceBlock;
    }


    //Функция для изменения цвета иконок svg в работе
    _changeSvgColor() {

    }
}