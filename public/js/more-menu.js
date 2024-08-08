let cardMore = document.getElementsByClassName('card-more');
let menu = document.getElementsByClassName('more-menu');

Array.from(cardMore).forEach((card) => {
    card.addEventListener('click', () => {
        const child = card.children[2];
        child.classList.toggle('open-more-menu');
    });
});