import ContextMenu from "../../components/ContextMenu/ContextMenu";
import { qs } from "../../helpers/dom";
import { renderMessageIds } from "../messageApi/messageStore";

//Функция управления появлением контекстного меню
export default function messageActions(e) {
    e.preventDefault();
    
    const messageBlock = e.target.closest('.message-block');
    const id = messageBlock.getAttribute('data-id');
    console.log(renderMessageIds.get(id));

    const contextMenuElement = qs('.context-menu');
    if (messageBlock && !contextMenuElement) {
        const contextMenu = new ContextMenu(e);
        const contextMenuItem = contextMenu.showContextMenu();
    }
}


