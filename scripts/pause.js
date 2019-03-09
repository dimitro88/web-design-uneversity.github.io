const modal = document.getElementById('myModal');
const videoTag = document.getElementById('first-video');
const span = document.getElementsByClassName("close")[0];

videoTag.onpause = () => {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}