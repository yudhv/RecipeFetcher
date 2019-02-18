import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        const res = await axios(`${proxy}/https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
        this.title = res.data.recipe.title;
        this.ingredients = res.data.recipe.ingredients;
        this.image = res.data.recipe.image_url;
        this.publisher = res.data.recipe.publisher;
        this.source_url = res.data.recipe.source_url;    
    }

    calcTime(){
        this.time = 40;
    }

    calcServings(){
        this.servings = 4;
    }
    
}