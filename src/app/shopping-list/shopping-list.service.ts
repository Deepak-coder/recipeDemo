import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
 })
export class ShoppingListService{
    ingredientChanged= new EventEmitter<Ingredient[]>();
    StartedEditing = new Subject<number>();
   private ingredients:Ingredient[]=[
        new Ingredient('apples',10),
        new Ingredient('tomatoes',9),
        new Ingredient('dahi',5)
      ];
      getIngredients(){
          return this.ingredients.slice();
      }
     addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice());
       }
       addIngredients(ingredients:Ingredient[]){
          this.ingredients.push(...ingredients);
          this.ingredientChanged.emit(this.ingredients.slice());
       }

       editGetIngredient(index:number){
         return this.ingredients[index];
       }

       updateItem(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
       }

       deleteIngredients(index:number){
         this.ingredients.splice(index,1);
         this.ingredientChanged.next(this.ingredients.slice());
      }

}