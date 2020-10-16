import { Ingredient } from '../shared/ingredient.model';

export class Recipe{


  // Changes need to be done in this Model

 public name:string;
 public discription:string;
 public imagePath:string;
 public price:number = 8;
 public cart:any = {
   inCart:true,
   quantity:1
 };
 public ingredients:Ingredient[];
 constructor(name:string, discription:string, imagePath:string,ingredients:Ingredient[]){
  this.name=name;
  this.discription=discription;
  this.imagePath=imagePath;
  this.ingredients=ingredients;
 }
}