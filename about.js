document.addEventListener('DOMContentLoaded', () => {
    const leftButton = document.querySelector('.nav-button.left');
    const rightButton = document.querySelector('.nav-button.right');
    const itemContainer = document.getElementById('item');

    if (!leftButton || !rightButton || !itemContainer) {
        console.error("Not Found");
        return;
    }
    leftButton.addEventListener('click', () => {
        itemContainer.scrollBy({ left: -400, behavior: 'smooth' });
    });
    rightButton.addEventListener('click', () => {
        itemContainer.scrollBy({ left: 400, behavior: 'smooth' });
    });
});