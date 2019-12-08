import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipes.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.sass'],
})
export class RecipesPage implements OnInit, OnDestroy {
  private recipes:Recipe[] = [];  

  private revipesSubscription:Subscription = new Subscription();
  constructor(private recipeServ:RecipesService) { }

  ngOnInit() {
    this.recipeServ.getRecipes();
    this.revipesSubscription = this.recipeServ.recipesSubject.subscribe(recipes=>{
      this.recipes = recipes;
    });
  }
  ngOnDestroy(): void {
    this.revipesSubscription.unsubscribe();
  }

 

}