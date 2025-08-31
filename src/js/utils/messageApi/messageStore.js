export const renderMessageIds = new Map();

let pinnedMessage = null;

//Устанавливаем закрепленное сообщение
export function setPinnedMessage(msg) {
  pinnedMessage = msg;
  localStorage.setItem('pinnedMessage', JSON.stringify(msg))
}

//Получаем закрепленное сообщение
export function getPinnedMessage() {
  if(!pinnedMessage){
    const saved = localStorage.getItem('pinnedMessage');
    if(saved){
      pinnedMessage = JSON.parse(saved);
    }
  }
  return pinnedMessage;
}

//Проверяем на закрепленное сообщение
export function isMessagePinned(id) {
  return pinnedMessage?.id === id;
}

//Очищаем закрепленное сообщение
export function clearPinnedMessage() {
  pinnedMessage = null;
  localStorage.removeItem('pinnedMessage');
}