import dayjs from 'dayjs'
import { createElement } from '../../../../helpers/dom';

export default function getMessageTime(){
    const time = dayjs().format('HH:mm');
    const timeBlock = createElement('div', ['time-block']);
    const timeText = createElement('p', ['time-text'], time);
    const messageStatusIcon = createElement('img', ['message-status-icon']);

    timeBlock.append(timeText, messageStatusIcon);

    return timeBlock;
}