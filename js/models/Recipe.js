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
    
    parseIngredients(){
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','lb'];

        const newIngredients = this.ingredients.map(el => {
            let ingredient = el.toLowerCase();

            // 1 -> Uniform units
            unitsLong.forEach((unit,index) => {
                ingredient = ingredient.replace(unit,unitsShort[index]);
            });

            // 2 -> Remove paranthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3 -> Get value of each ingredient
            let arrIng = ingredient.split(' ');
            let unitIndex = arrIng.findIndex(el => unitsShort.includes(el));
            let objIng = {};

            if(unitIndex > -1){
                let count = eval(arrIng.slice(0,unitIndex).join('+'));
                objIng = {
                    count: count%1 === 0 ? count : count.toFixed(2),
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                };
            }
            else if(parseInt(arrIng[0],10)){
                objIng = {
                    count: parseInt(arrIng[0],10),
                    units: "",
                    ingredient: arrIng.slice(1).join(' ')
                };
            }
            else if(unitIndex === -1){
                objIng = {
                    count: 1,
                    units: "",
                    ingredient: arrIng.join(' ')
                };
            }
            
            return objIng;
        })
        this.ingredients = newIngredients;

        
        
    }
    
}