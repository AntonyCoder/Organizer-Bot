//Загрузка сообщений
const API_URL = 'http://localhost:3000/messages';

export default async function loadData(offset, limit) {
    try {
        const response = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
        const messages = await response.json();

        return messages;
    } catch (error) {
        console.error(error);
        return [];
    }
}

//Отправка сообщения
export async function fetchMessage(newMessage) {
    try {
        //Если это текстовое сообщение
        if (newMessage.type === 'text' || newMessage.type === 'location') {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage),
            })
        } else {
            //Если другие виды сообщения, например файлы или изображения
            const formData = new FormData();
            formData.append('id', newMessage.id);
            formData.append('type', newMessage.type);
            formData.append('time', newMessage.time);
            formData.append('file', newMessage.messageContent);
            if (newMessage.name) {
                formData.append('name', newMessage.name);
            }
            await fetch(API_URL, {
                method: 'POST',
                body: formData
            })
        }
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
    }
}