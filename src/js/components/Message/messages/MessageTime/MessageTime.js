import './MessageTime.scss';
import doubleCheck from '../../../../../assets/svg/double-check.svg';

import { createElement } from '../../../../helpers/dom';

export default function MessageTime(time){
    // const time = dayjs().format('HH:mm');
    const timeBlock = createElement('div', ['time-block']);
    const timeText = createElement('p', ['time-text'], time);
    const messageStatusIcon = createElement('img', ['message-status-icon', 'icon']);
    messageStatusIcon.src = doubleCheck;

    timeBlock.append(timeText, messageStatusIcon);

    return timeBlock;
}