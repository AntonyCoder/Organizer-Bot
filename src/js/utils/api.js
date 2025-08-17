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
export async function fetchMessage(type, text) {
    try {
        await fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type, text: text }),
        })
    } catch (error) {
        console.error(error)
    }
}