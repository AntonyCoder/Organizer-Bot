//Установка корректного пути для отображения медиа
export default function setUrl(message, path) {
    if (path instanceof File) {
        message.src = URL.createObjectURL(path);
    } else if (typeof path === 'string') {
        message.src = `http://localhost:3000${path}`;
    }
}