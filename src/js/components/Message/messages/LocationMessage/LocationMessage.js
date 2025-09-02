import './LocationMessage.scss';
import { createElement } from "../../../../helpers/dom";
import MessageTime from "../MessageTime/MessageTime";
import getPosition from '../../../../utils/mapLocation/getPosition';
import {faker} from '@faker-js/faker';

export default class LocationMessage {
    constructor(id, content, time) {
        this.time = time;
        this.mapId = `map-${faker.string.uuid()}`
        this.id = id;
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block']);
        messageBlock.setAttribute('data-id', this.id);
        const messageTime = MessageTime(this.time);
        
        const map = createElement('div', ['message-location']);
        map.id = this.mapId;
        
        getPosition(this.mapId);

        messageBlock.append(map, messageTime);
        return messageBlock;
    }
}