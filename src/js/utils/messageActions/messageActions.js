import { qs } from "../../helpers/dom";
import { renderMessageIds } from "../messageApi/messageStore";

//Функция управления появлением контекстного меню
export default function messageActions(e, contextMenu) {
    e.preventDefault();
    
    const messageBlock = e.target.closest('.message-block');
    if(!messageBlock) return

    const id = messageBlock.getAttribute('data-id');
    const targetMessage = renderMessageIds.get(id);

    const contextMenuEl = qs('.context-menu');
    if (messageBlock && !contextMenuEl) {
       contextMenu.showContextMenu(e, targetMessage);
    }
}