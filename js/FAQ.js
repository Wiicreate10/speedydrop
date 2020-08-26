// get the cards section and deligate to the chevrons
const cardSection = document.getElementById('cards');

// eventlistener
cards.addEventListener('click', (e) => {
    const icon = e.target.closest('.icon');

    if (icon === null) return;
    console.log(icon);

    // get the card/parent
    const parentCard = icon.parentElement;

    // 
    parentCard.classList.toggle('expanded');
    icon.classList.toggle('fa-chevron-up');
})