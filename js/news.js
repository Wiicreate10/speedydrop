// init a state for the pagination 
const paginationState = {
    "newsList": [],
    "currentPage": 1,
    "newsPerPage": 4
};

// variable for news
let newsList;
// get the root folder
let URL = location.href.split("/");
// extract the URL
URL.pop();
URL = URL.join("/");


// handle news
const handleNews = () => {
    

   getNews(`${URL}/data/news.json`)
    .then(news => generateNews(news))
    // .then(news => generateNews(news)) 
    .then(newsCard => renderNewsCard(newsCard));
}

// generate the news
const generateNews = (news) => {
    
    paginationState.newsList = news;
        
    // pass the state into the pagination function and get the paginated list details
    const pagedNewsListDetails = pagination(paginationState);
        
    let newsCard = '';

    // get the paginated list
    const pagedNewsList = pagedNewsListDetails.newsDisplay; 

    // generate and save the cards in a variable
    pagedNewsList.forEach(newsInfo => {
        newsCard += `
        <div class="card news-card">
                <img src="${URL}/img/news_imgs/${newsInfo.cardPhotoURL}" alt="card-image">
                <div class="card-details">
                    <h3> ${newsInfo.title}</h3>
                <p>${newsInfo.cardText}</p>
                <div class="date-comments">
                    <div class="date">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${newsInfo.newsDate.month} ${newsInfo.newsDate.day}, ${newsInfo.newsDate.year}</span>
                    </div>
                    <div class="comments">
                        <i class="fas fa-comments"></i>
                        <span>${newsInfo.noOfComment}</span>
                    </div>
                </div>
                <div class="read-more"> <a href="${newsInfo.linkURL}">read more <i class="fas fa-chevron-right"></i></a> </div>
                </div>
            </div>`
    })

    // create page tab
    createPageTab(pagedNewsListDetails.noOfNewsTabs, paginationState)


    return newsCard;
}

// render it into the DOM
const renderNewsCard = (cards) => {
    // get the parent
    const newCardGrid = document.getElementById('news-card-grid');

    // insert cards to parent
    newCardGrid.innerHTML = cards;
}

// pagination
const pagination = (state) => {
    const newsList = state.newsList,
    current = state.currentPage,
    npp = state.newsPerPage;

    // get the starting an ending news card per page
    const newsStart = (current - 1) * npp,
    newsEnd = newsStart + npp,

    // get the news to be displayed
    newsDisplay = newsList.slice(newsStart, newsEnd),

    // get the number of pages
    noOfNewsTabs = Math.ceil(newsList.length / npp);

    // console.log(newsList.length , npp)
    return {
        newsDisplay,
        noOfNewsTabs
    }
}

// create page tab
const createPageTab = (noOfTabs,state) => {
    // get the parent nav
    const parentNav = document.getElementById("paginationNav")

    // create prev and next tabs
    let prevTab = `<button class="direction" id="prevTab"><i class="fas fa-chevron-left"></i></button>`,
    nextTab = `<button class="direction" id="nextTab"><i class="fas fa-chevron-right"></i></button>`,

    // init newsTabs
    newsTabs = '';

    // loop through the no of tabs and creating the tabs strings adding an active class to the crrent page's tab
    for (let tabNum=1; tabNum <= noOfTabs;  tabNum++) {
        newsTabs +=  state.currentPage === tabNum ? `<button class="active" value="${tabNum}">0${tabNum}</button>` :`<button value="${tabNum}">0${tabNum}</button>`;
    }

    // if the currentpage is less or equal to 1, disable the prev btn
    if (state.currentPage <= 1) {
        prevTab = `<button class="direction" disabled><i class="fas fa-chevron-left"></i></button>`;
    }
    
    // if it current page is the last, disable the next btn
    if (state.currentPage >= noOfTabs) {
        nextTab = `<button class="direction" disabled><i class="fas fa-chevron-right"></i></button>`;
    }


    // insert all created tabs in the parent nav
    parentNav.innerHTML = `${prevTab} ${newsTabs} ${nextTab}`;
}

// go to page
const goToPage = (e) => {
    e.preventDefault();

    // get the targeted tab
    const targetTab = e.target.closest("button");

    // if target is null (or disabled) don't go further
    if (targetTab === null) return;

    // if the next tab was clicked, increase current page
    if ( targetTab.id === "nextTab") {
        paginationState.currentPage++; 
    }
    // if the previous tab was clicked, decrease current page
    else if (targetTab.id === "prevTab") {
        paginationState.currentPage--;
    }
    // if a particular numaber tab was clicked, set the current page to the value of that tab
    else {
        paginationState.currentPage = Number(targetTab.value);
    }
    // run handle news with the updated pagination state
    handleNews();
}
// eventlisteners
// when the page loads, load news as well
document.addEventListener("DOMContentLoaded",handleNews);
// when pagination nav is clicked
document.getElementById('paginationNav').addEventListener('click', goToPage);


// Q.E.D