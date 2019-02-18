import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults () {
        const response = await axios(`${proxy}/https://www.food2fork.com/api/search?key=${key}&q=${this.query}`); 
        console.log(response);
        this.recipes = response.data.recipes;
        return(this.recipes);
    }
}