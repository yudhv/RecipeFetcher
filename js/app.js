import Search from './models/Search';
import elements from './views/base';
import * as searchView from './views/searchView';

const state = {}

async function initiateSearch() {
    // 1 - Get input
    const query = elements.searchInput.value;
    console.log(query);

    //2 - Change state 
    state.search = new Search(query);

    //3 - Prepare UI for update
    elements.searchResults.innerHTML = '';

    //4 - Get the results from API
    const results = await state.search.getResults();
    
    //5 - Display them in the UI
    searchView.setResults(results);

    
}

elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    initiateSearch();
})

elements.searchInput.addEventListener('click',()=>{
    elements.searchInput.;
})
