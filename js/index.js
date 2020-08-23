// get the chevron icom for the dropdown menu in the nav bar
const chevron = document.getElementById('chevron');
// get the burger for the mobile view
const burger = document.getElementById('burger-icon');
// the nav-bar
const navBar = document.querySelector('.nav-bar');



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
    navBar.classList.toggle('transparent');
}

const handleCarousel = () => {
    // get the container
    const slideContainer = document.querySelector('.slide-container');
    // the slides
    const slides = Array.from(slideContainer.children);
    // the indicator text
    const indicatorText = document.querySelector('.indicator-text');
    // the indicator slider
    const indicatorSlider = document.querySelector('.slider');


    // set the width of the container
    slideContainer.style.width = `${slides.length * 100}%`;

    // variables
    let currentSlide = 0; //skip the clone
    
    // the width
    let slideWidth = slides[0].clientWidth;

    // set the carousel to the first original slide
    slideContainer.style.transform = `translateX(${-slideWidth * currentSlide}px)`;

    
    const changeCarousel = () => {
        if(currentSlide >= slides.length-1) return;
        // add transition class to the carousel
        slideContainer.classList.add('scroll-smooth');
         
        // increase the current slide counter
        currentSlide++

        // set the index to be 1 greater than the slide counter
        let index = currentSlide +1;

        // translate the slide
        slideContainer.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
        
        // if the index is greater than 3, set it to back to 1
        if(index>3){
            index = 1;
        }
        // update the indicator text
        indicatorText.textContent = `0${index}`;

        // update the indicator slider
        indicatorSlider.style.transform = `translateX(${(index-1) * 100}%)`
    }

    slideContainer.addEventListener('transitionend', () => {
        if (slides[currentSlide].id === 'firstClone') {
            // remove transition class to the carousel
            slideContainer.classList.remove('scroll-smooth');

            // take the slide back to the beginning without a transition effect
            currentSlide = 0;
            
            // translate the slide
            slideContainer.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
        }
    })
    window.addEventListener("resize", () => {
        slideWidth= slides[0].clientWidth;

        // set the carousel to the first original slide
        slideContainer.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    })
    // change carousel every 5 secs
    setInterval(changeCarousel,5000)
}
// event listeners
// to the chevron
chevron.addEventListener('click', onChevronClick);
// to the burger
burger.addEventListener('click', onBurgerClick);
// to the document
document.addEventListener('DOMContentLoaded', handleCarousel);