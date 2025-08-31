//Ограничение длины имени файла
export default function limitContent(name, length = 30){
    if(name.length > length){
        return name.slice(0, length) + '...';
    }
    return name;
}