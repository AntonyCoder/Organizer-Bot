import './Header.scss';
import search from '../../../assets/svg/search.svg';
import sidebar from '../../../assets/svg/sidebar.svg';
import { createElement } from '../../helpers/dom';
import toggleClassName from '../../helpers/toggleClassName';

export default class Header {

    init() {
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
        const headerSearchIcon = createElement('img', ['header-search-icon', 'icon']);
        headerSearchIcon.src = search;

        headerSearchWrapper.append(headerSearch, headerSearchIcon);

        const sidebarButton = createElement('button', ['sidebar-button']);
        const sidebarButtonIcon = createElement('img', ['sidebar-button-icon', 'icon']);
        sidebarButtonIcon.src = sidebar;

        sidebarButton.appendChild(sidebarButtonIcon);

        serviceBlock.append(headerSearchWrapper, sidebarButton);

        toggleClassName(headerSearchIcon, headerSearch, 'search-active');

        return serviceBlock;
    }

    //Функция для изменения цвета иконок svg в работе
    _changeSvgColor() {

    }
}