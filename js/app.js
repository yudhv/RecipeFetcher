import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements, renderLoader} from './views/base';
import * as searchView from './views/searchView';

const state = {}

async function initiateSearch() {
    // 1 - Get input
    state.query = searchView.getQuery();

    //2 - Change state 
    state.search = new Search(state.query);

    //3 - Prepare UI for update
    searchView.clearResults();
    renderLoader(elements.searchResults);

    //4 - Get the results from API
    await state.search.getResults();
    
    //5 - Display them in the UI
    searchView.clearResults();
    searchView.setResults(state.search.recipes);

}

async function initiateRecipe(){
    //1 - Get input
    const hash = window.location.hash.replace('#','');

    //2 - Change state
    state.recipe = new Recipe(hash);
    window.r = state.recipe;

    //3 - Prepare UI for update


    //4 - Make the API call
    await state.recipe.getRecipe();

    //5 Display result
    console.log(state.recipe);

}

elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    initiateSearch();
})

elements.searchInput.addEventListener('click',()=>{
    elements.searchInput.select();
})

elements.searchResultsPages.addEventListener('click',(e)=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const page = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.setResults(state.search.recipes,page);
    }
});
window.addEventListener('hashchange',initiateRecipe);
window.addEventListener('load',() => {
    elements.searchInput.value = 'pizza';
    initiateSearch();
});