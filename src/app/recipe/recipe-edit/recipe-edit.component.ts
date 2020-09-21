import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup ,FormControl, FormArray, Validators} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm:FormGroup;
  recipeIngredient:FormArray;

  onSubmit(){
      console.log(this.recipeForm,'it is the recipe form');
    // const newRecipe = new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['discription'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients']
    // );
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
      this.notification.showSuccess(" It is updated.Successfully...!!!");
    } 
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  constructor(private route:ActivatedRoute , private recipeService:RecipeService,private router:Router , private notification : NotificationService) { }
  
  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        this.editMode=params['id']!=null;
        console.log(this.editMode);
        this.initForm();
      }
    );
  }
  
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDiscription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDiscription=recipe.discription;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm= new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'discription':new FormControl(recipeDiscription,Validators.required),
      'ingredients':recipeIngredients
    });
  }
  
  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onCancel(){
   this.router.navigate(['../'],{relativeTo: this.route });
  }

}
