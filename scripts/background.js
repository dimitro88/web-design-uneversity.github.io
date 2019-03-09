const tables = document.getElementsByClassName('tables-container')[0];
const lists = document.getElementsByClassName('lists-container')[0];
const video = document.getElementsByClassName('video-container')[0];
const audio = document.getElementsByClassName('audio-container')[0];

const elements = [tables, lists, video, audio];

elements.forEach(element => {
    element.addEventListener('dblclick', () => {
        console.log(element.style.backgroundColor);
        element.style.backgroundColor === 'white' || element.style.backgroundColor === '' ? element.style.backgroundColor = 'black' : element.style.backgroundColor = 'white';
    }, false)
})

