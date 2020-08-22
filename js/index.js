// get the chevron icom for the dropdown menu in the nav bar
const chevron = document.getElementById('chevron');
// get the burger for the mobile view
const burger = document.getElementById('burger-icon');

// define the functions
// on chevron click
const onChevronClick = (e) => {
    // prevent link from going through
    e.preventDefault();

    // get the dropdown
    const dropdown = document.querySelector(".dropdown-items");

    // toggle the required classes
    dropdown.classList.toggle('expanded');
    chevron.classList.toggle('fa-chevron-up');
}

const onBurgerClick = (e) => {
    // get the nav menu
    const navMenu = document.querySelector('.nav-link-list');

    // toggle the required classes
    navMenu.classList.toggle('expanded');
    burger.classList.toggle('navIsExpanded');
}
// event listeners
// to the chevron
chevron.addEventListener('click', onChevronClick);
// to the burger
burger.addEventListener('click', onBurgerClick);