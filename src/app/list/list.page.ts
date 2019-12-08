import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from './character.model';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.sass'],
})
export class ListPage implements OnInit, OnDestroy {
  private recipes:Character[] = [];  

  private revipesSubscription:Subscription = new Subscription();
  constructor(private recipeServ:ListService) { }

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