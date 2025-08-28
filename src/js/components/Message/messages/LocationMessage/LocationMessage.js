import './LocationMessage.scss';
import { createElement } from "../../../../helpers/dom";
import MessageTime from "../MessageTime/MessageTime";
import getPosition from '../../../../utils/mapLocation/getPosition';
import {faker} from '@faker-js/faker';

export default class LocationMessage {
    constructor(content, time) {
        this.time = time;
        this.mapId = `map-${faker.string.uuid()}`
    }

    //Отрисовка сообщения
    render() {
        const messageBlock = createElement('div', ['message-block']);
        const messageTime = MessageTime(this.time);
        
        const map = createElement('div', ['message-location']);
        map.id = this.mapId;
        
        getPosition(this.mapId);

        messageBlock.append(map, messageTime);
        return messageBlock;
    }
}