import {elements} from './base';

export const getQuery = () => elements.searchInput.value;

export const setResults = (results) => {
    results.map((result)=>{
        const htmlResult = createListHTML(result);
        elements.searchResults.insertAdjacentHTML('beforeend',htmlResult);
    });
}

export const clearResults = () => {
    elements.searchResults.innerHTML = '';
}

const getShortenedTitle = (title,limit = 18) => {
    if(title.length <= limit) return title;
    else return getShortenedTitle(title.substring(0,title.lastIndexOf(' ')));
}

const createListHTML = (result) => {
    console.log(result);
    const htmlResult = `
    <li>
        <a class="results__link results__link--active" href="#23456">
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
