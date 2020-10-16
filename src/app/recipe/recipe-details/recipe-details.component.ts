import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router, 
    private notification:NotificationService ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.recipe=this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList(){
    if(this.recipe.cart.inCart == false){
      this.recipeService.addItemsToShoppingList(this.recipe);
      this.notification.showSuccess('successfully added to the cart...!!!');
    }
    else
    this.notification.showWarning('already in cart');
  }

  onEditRecipe(){
   this.router.navigate(['edit'],{relativeTo:this.route});
  // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
    this.notification.showWarning('successfully deleted  item from the  recipe...!!!');
  
  }
  
}
