import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import { Recipe } from '../recipe/recipe.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  
  ingredients:Ingredient[];
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.slService.getIngredients();
    this.slService.ingredientChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    })
  }
  onEditItem(index:number){
   this.slService.StartedEditing.next(index);
  }
  

}
