import './MessageTime.scss';
import doubleCheck from '../../../../../svg/double-check.svg';
import dayjs from 'dayjs';
import { createElement } from '../../../../utils/dom';

export default function MessageTime(){
    const time = dayjs().format('HH:mm');
    const timeBlock = createElement('div', ['time-block']);
    const timeText = createElement('p', ['time-text'], time);
    const messageStatusIcon = createElement('img', ['message-status-icon', 'icon']);
    messageStatusIcon.src = doubleCheck;

    timeBlock.append(timeText, messageStatusIcon);

    return timeBlock;
}