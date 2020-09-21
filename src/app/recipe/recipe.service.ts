import{Recipe} from './recipe.model';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class RecipeService{
    recipesChanged =new Subject<Recipe[]>();
  //  private recipes : Recipe[]=[
  //       new Recipe(
  //         'test recipe',
  //         'this simply a test',
  //         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //          [
  //            new Ingredient('meat',1),
  //            new Ingredient('french Fries',2)
  //          ]),
  //       new Recipe(
  //         'model recipe',
  //         'this a test',
  //         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //         [
  //            new Ingredient('meat',1),
  //            new Ingredient('french Fries',2)
  //         ]),
  //       new Recipe('spicy recipe',
  //       'this a recipe',
  //       'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //       [
  //            new Ingredient('meat',1),
  //            new Ingredient('french Fries',2)
  //       ])
  //     ];

     private recipes:Recipe[] = [];
      constructor(private slService:ShoppingListService, private messageService:MessageService){}

      setRecipe(recipe:Recipe[]){
        this.recipes = recipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
        return this.recipes.slice();
      }
      getRecipe(index:number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients:Ingredient[]){
       this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe:Recipe){
       this.recipes.push(recipe);
       this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
       this.recipes.splice(index, 1);
       this.recipesChanged.next(this.recipes.slice());
      }
}