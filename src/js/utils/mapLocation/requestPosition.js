export default async function requestPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true
        });

        function success({ coords }) {
            resolve([coords.latitude, coords.longitude]);
        }

        function error(error) {
            reject(error);
        }
    })
}