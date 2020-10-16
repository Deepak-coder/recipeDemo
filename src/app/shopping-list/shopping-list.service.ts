import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipe/recipe.model';

@Injectable({
  providedIn: 'root',
 })
export class ShoppingListService{
    ingredientChanged= new EventEmitter<Ingredient[]>();
    cartChanged =new Subject<any>();
    StartedEditing = new Subject<number>();
   private ingredients:Ingredient[]=[
        new Ingredient('apples',1),
        new Ingredient('tomatoes',1),
        new Ingredient('dahi',1)
      ];

   private recipeCart:Recipe[] = [
     new Recipe('Mix-veg','it is sweet and lillte bit spicy',
     'https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/phut_0.jpg?itok=h30EAnkk',
     [
      new Ingredient('apples',1),
      new Ingredient('tomatoes',1),
      new Ingredient('dahi',1)
     ])
   ];

    private shoppingCart = [{
      totalItems:1,
      totalAmount:8,
      cartItems:this.recipeCart
    }];
     
      getShoppingCart(){
        // this line also needs to be changed in future
         return this.shoppingCart.slice();
      }

      addItem(recipe:Recipe){
         let x =recipe;
          x.cart.inCart = true;
          recipe.cart.quantity = 1;
          this.recipeCart.push(recipe);
          this.changeCartQuantity('addItem'); 
        // this.cartChanged.next(this.shoppingCart.slice());
      }

      // addItems(){

      // }

      editGetItem(){

      }

      updateItem(index:number,newIngredient:Ingredient){

      }

      deleteItem(index:number){
        this.changeCartQuantity('deleteItem',index);
        this.recipeCart[index].cart.inCart= false;
        this.recipeCart[index].cart.amount= 0;
        this.recipeCart.splice(index,1);
        // this.cartChanged.next(this.shoppingCart.slice());
      }
      
      //  changes needs to be done in this function

      changeCartQuantity(msg:string,index:number = null,i:number = null){
    
        // console.log(this.shoppingCart[0].totalItems,'cart quantity');
        if(msg == 'addItem'){
          this.shoppingCart[0].totalItems += 1;

        }
        if(msg == 'deleteItem'){
          this.shoppingCart[0].totalItems -= this.recipeCart[index].cart.quantity;

        }
        if(msg == 'changeQuantity'){
            if(i == -1){
              this.recipeCart[index].cart.quantity -= 1;
              this.shoppingCart[0].totalItems -=1;
              console.log(this.shoppingCart,'check this here');
            }else{
              this.recipeCart[index].cart.quantity += 1;
              this.shoppingCart[0].totalItems += 1
              console.log(this.shoppingCart,'check this here');
            }
        }
         this.calculatePrice();
         this.cartChanged.next(this.shoppingCart.slice());
      }

      calculatePrice(){
        if(this.shoppingCart[0].totalItems !== 0){
          this.shoppingCart[0].totalAmount = 0;
          for (var i in this.recipeCart) {
            this.shoppingCart[0].totalAmount +=(this.recipeCart[i].cart.quantity * this.recipeCart[i].price);
          }
        }
        else
          this.shoppingCart[0].totalAmount = 0;
        
      }



     // these functions should not be used



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

      //  updateItem(index:number,newIngredient:Ingredient){
      //   this.ingredients[index]=newIngredient;
      //   this.ingredientChanged.next(this.ingredients.slice());
      //  }

       deleteIngredients(index:number){
         this.ingredients.splice(index,1);
         this.ingredientChanged.next(this.ingredients.slice());
      }
    }