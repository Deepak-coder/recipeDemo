import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn:"root"})
export class DataStorageService{

    constructor(private http:HttpClient , private recipeService:RecipeService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
         console.log('hello');
         this.http.put('https://recipe-book-74d8a.firebaseio.com/recipes.json',recipes).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipe(){
        return this.http.get<Recipe[]>('https://recipe-book-74d8a.firebaseio.com/recipes.json').pipe(map(recipe => {
        return recipe.map(recipe=>{
            return{...recipe, ingredients:recipe.ingredients ? recipe.ingredients : []};
        })   
        }),
        tap(recipe => {
         this.recipeService.setRecipe(recipe);
        })
        )
    }


}