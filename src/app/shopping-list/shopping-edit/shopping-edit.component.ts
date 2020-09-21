import { Component, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f',{'static':false}) slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedIndex:number;
  editingitem:Ingredient;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
   this.subscription= this.shoppingListService.StartedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedIndex= index;
        this.editingitem= this.shoppingListService.editGetIngredient(this.editedIndex);
        this.slForm.setValue({
          name: this.editingitem.name,
          amount:this.editingitem.amount
        })
      }
    )
  }
  onAddItem(form:NgForm){
    const value = form.value;
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateItem(this.editedIndex,newIngredient);
    }
    else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }
  onClearForm(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.onClearForm();
    this.shoppingListService.deleteIngredients(this.editedIndex);
  }

}
