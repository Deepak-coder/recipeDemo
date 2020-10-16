import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  ingredients:Ingredient[];
  shoppingCart:any= [];

  constructor(private router:Router , private slService : ShoppingListService , private notify:NotificationService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    })

    let cart = this.slService.getShoppingCart();
    this.shoppingCart= cart[0];
    this.slService.cartChanged.subscribe((cart:any)=>{
      this.shoppingCart = cart[0];
      console.log(this.shoppingCart,'we got the updated cart');
    });
   
  }

   navigateTo(here:string){

     if(here == 'shopping-cart')
      this.router.navigate(['../shopping-list']);

     if(here == 'checkout')
      this.router.navigate(['../recipes']);
   }

   onDeleteItem(index:number){
    this.slService.deleteItem(index);
    this.notify.showSuccess('item is deleted');
   }
}
