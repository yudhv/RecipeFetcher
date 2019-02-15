import elements from './base';

export const getQuery = () => elements.search.value;

export const setResults = (results) => {
    results.map((result)=>{
        const htmlResult = createListHTML(result);
        elements.searchResults.insertAdjacentHTML('beforeend',htmlResult);
    });
    
}

const createListHTML = (result) => {
    console.log(result);
    const htmlResult = `
    <li>
        <a class="results__link results__link--active" href="#23456">
            <figure class="results__fig">
                <img src=${result.image_url} alt="${result.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${result.title}</h4>
                <p class="results__author">${result.publisher}</p>
            </div>
        </a>
    </li>
    `;

    return(htmlResult);
}
