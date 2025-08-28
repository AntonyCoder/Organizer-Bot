import getMap from "./getMap";

export default function getPosition(mapId) {
    navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
    })

    function success({ coords }) {
        const { latitude, longitude } = coords;
        const position = [latitude, longitude];

        getMap(mapId, position, 'You are here');
    }

    function error({ message }) {
        console.error('Ошибка определения геопозиции', message);
        alert('Необходимо предоставить доступ к местоположению');
    }
}
