//Загрузка сообщений
export default async function loadData() {
    try {
        const response = await fetch('http://localhost:3000/messages')
        const messages = await response.json();

        return messages;
    } catch (error) {
        console.error(error);
    }
}

//Отправка сообщения
export async function fetchMessage(type, messageContent) {
    try {
        //Если это текстовое сообщение
        if (type === 'text') {
            await fetch('http://localhost:3000/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: type, messageContent: messageContent }),
            })
        } else {
            //Если другие виды сообщения, например файлы или изображения
            const formData = new FormData();
            formData.append('type', type);
            formData.append('file', messageContent);
            await fetch('http://localhost:3000/messages', {
                method: 'POST',
                body: formData
            })
        }
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
    }
}