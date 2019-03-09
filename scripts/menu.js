const menu = document.getElementById('menu');

console.log(menu.children);
Array.from(menu.children).forEach(child => {
    child.innerText.split('').forEach(item => {
        let letter = document.createElement('span');
        letter.innerText = letter.innerHTML = item;
        letter.addEventListener('mouseover', () => {
            console.log(letter.style);
            letter.style.fontSize = '20px';
        }, false);
        letter.addEventListener('mouseout', () => {
            letter.style.fontSize = '14px';
        }, false);
        child.appendChild(letter);
    });
    child.removeChild(child.children[0]);
});