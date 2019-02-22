import {elements} from './base';

export const getQuery = () => elements.searchInput.value;

export const setResults = (results, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = (page * resPerPage) - 1;
    results.slice(start,end).map((result)=>{
        const htmlResult = createListHTML(result);
        elements.searchResults.insertAdjacentHTML('beforeend',htmlResult);
    });
    setPageButtons(results.length, resPerPage, page);
}

export const clearResults = () => {
    elements.searchResults.innerHTML = '';
}

export const setPageButtons = (totalResults, resPerPage, page) => {
    let buttonHTML;
    let totalPages = Math.ceil(totalResults/resPerPage);
    if(page == 1 && totalPages > 1){
        buttonHTML = createPageButtonHTML(page+1,'next');
    }
    else if(page > 1 && page < totalPages){
        buttonHTML = `
            ${createPageButtonHTML(page+1,'next')}
            ${createPageButtonHTML(page-1,'prev')}
        `;
    }
    else if(page === totalPages && totalPages > 1){
        buttonHTML = createPageButtonHTML(totalPages-1, 'prev');
    }
    elements.searchResultsPages.innerHTML = '';
    elements.searchResultsPages.insertAdjacentHTML('afterbegin',buttonHTML);
    
}

export const highlightSelected = (hash) => {
    // Remove all previous highlights
    const allHighlights = Array.from(document.querySelectorAll(".results__link"));
    allHighlights.forEach(el => el.classList.remove('results__link--active'));
    
    document.querySelector(`a[href="#${hash}"]`).classList.add('results__link--active');
}

const createPageButtonHTML = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${page}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${page}</span>
    </button>
`;

const getShortenedTitle = (title,limit = 18) => {
    if(title.length <= limit) return title;
    else return getShortenedTitle(title.substring(0,title.lastIndexOf(' ')));
}

const createListHTML = (result) => {
    const htmlResult = `
    <li>
        <a class="results__link " href="#${result.recipe_id}">
            <figure class="results__fig">
                <img src=${result.image_url} alt="${getShortenedTitle(result.title)}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${getShortenedTitle(result.title)}</h4>
                <p class="results__author">${result.publisher}</p>
            </div>
        </a>
    </li>
    `;

    return(htmlResult);
}
