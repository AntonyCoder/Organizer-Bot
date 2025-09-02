//Установка корректного пути для отображения медиа
export default function setUrl(message, path, type = 'src') {
    if (path instanceof File) {
        message[type] = URL.createObjectURL(path);
    } else if (typeof path === 'string') {
        message[type] = `http://localhost:3000${path}`;
    }
}