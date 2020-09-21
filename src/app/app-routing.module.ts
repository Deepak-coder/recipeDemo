import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipe/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {path:'', redirectTo:'/recipes', pathMatch:'full'},
  {path:'recipes', component:RecipeComponent ,children:[
    {path:'' , component:RecipeStartComponent},
    {path:'new' ,component:RecipeEditComponent},
    {path:':id' ,component:RecipeDetailsComponent , resolve: [RecipeResolverService]},
    {path:':id/edit' ,component:RecipeEditComponent , resolve: [RecipeResolverService]}
  ]},
    {path:'shopping-list',component:ShoppingListComponent},
    {path:'auth',component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
