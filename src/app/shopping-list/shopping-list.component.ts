import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import { Recipe } from '../recipe/recipe.model';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  
  ingredients:Ingredient[];
  shoppingCart:any= {};
  constructor(private slService:ShoppingListService,private notify:NotificationService,private router:Router) { }

  ngOnInit() {
  // this.ingredients=this.slService.getIngredients();
  //   this.slService.ingredientChanged.subscribe((ingredients:Ingredient[])=>{
  //     this.ingredients=ingredients;
  //   });
    
    let cart = this.slService.getShoppingCart();
    this.shoppingCart= cart[0];
    this.slService.cartChanged.subscribe((cart:any)=>{
      this.shoppingCart = cart[0];
      console.log(this.shoppingCart,'we got the updated cart');
    });
  }
 
  onEditItem(index:number){
   this.slService.StartedEditing.next(index);
  }
  
  deleteItem(index:number){
    this.slService.deleteItem(index);
    this.notify.showInfo('item is deleted');
  }

  onChange(amount:number){
    console.log(amount,'this is the amount change');
   }

   onChangeQuantity(quantity,index:number){

    let itemQuantity = this.shoppingCart.cartItems[index].cart.quantity;
     if(quantity > itemQuantity ){
        this.slService.changeCartQuantity('changeQuantity',index,1);
     }
     else
      this.slService.changeCartQuantity('changeQuantity',index,-1);
   }
   navigateTo(){
    this.router.navigate(['../recipes']);
  }
}
