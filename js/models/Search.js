import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults () {
        const proxy = 'https://cors-anywhere.herokuapp.com';
        const response = await axios(`${proxy}/https://www.food2fork.com/api/search?key=5724c68e501f028c6002b91a5b9d6749&q=${this.query}`); 
        console.log(response);
        this.recipes = response.data.recipes;
        return(this.recipes);
    }
}