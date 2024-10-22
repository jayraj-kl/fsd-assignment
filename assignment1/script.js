let imageBox = document.querySelector('.image-box');

let next = document.getElementById('next')
next.addEventListener('click', () => {
    imageBox.scrollBy({ left: 500, behavior: "smooth" });
});

let prev = document.getElementById('prev')
prev.addEventListener('click', () => {
    imageBox.scrollBy({ left: -500, behavior: "smooth" });
    clearInterval(automaticScroll);
});

let automaticScroll = setInterval(() => {
    imageBox.scrollBy({ left: 500, behavior: "smooth" });
    if (imageBox.scrollLeft > 2000) {
        imageBox.scrollTo({ left: 0, behavior: "smooth" });
    }

}, 5000);