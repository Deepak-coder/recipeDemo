import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipe/recipe.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[RecipeService]
})
export class HeaderComponent implements OnInit {
  // msgs: Message[] = [];
  login:boolean = false;
  cartItem:Ingredient[];

 @Output() featureSelected = new EventEmitter<string>();   
  constructor( private dataService:DataStorageService , private RecipeService:RecipeService , private slService:ShoppingListService , 
    private confirmationService: ConfirmationService , private notify : NotificationService , private router :Router) { }

  ngOnInit() {
     let storage = localStorage.getItem('login');
     if(storage){
       console.log('it is loged in');
       this.login = true
     }
     else
      this.login = false;

      this.cartItem = this.slService.getIngredients();
      this.slService.ingredientChanged.subscribe((response)=>{
      this.cartItem = response;
    })
  }
 
  onSaveData(){
   this.dataService.storeRecipes();
   console.log('function is called');
  }

  onFetchData(){
    this.dataService.fetchRecipe().subscribe((response:any) =>{
      console.log('we got the fucking response',response);
    });
  }

  logout(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
         console.log('u r logged out');
         localStorage.clear();
         if(!localStorage.getItem('login')){
           this.login = false;
           this.router.navigate(['../recipes']);
           this.notify.showInfo('you are logged out.....!!!');
         }
          // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
      },
      reject: () => {
        console.log('u are about to logout');
          // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
  }

}
