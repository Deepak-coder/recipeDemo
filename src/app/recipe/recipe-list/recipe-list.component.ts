import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes : Recipe[];

  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[])=>{
         this.recipes = recipes;
          console.log('this is updated recipe',this.recipes);
      }
    )
    if(localStorage.getItem('recipes')){
      this.recipes = JSON.parse(localStorage.getItem('recipes'));
      console.log(this.recipes,'this is the recipe');
    }

  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
 

}
