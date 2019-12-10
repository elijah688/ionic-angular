import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
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
    this.recipeServ.getCharacters();
    this.revipesSubscription = this.recipeServ.characterSubject.subscribe(recipes=>{
      this.recipes.push(...recipes);
    });
  }
  ngOnDestroy(): void {
    this.revipesSubscription.unsubscribe();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.recipeServ.getCharacters();
      event.target.complete();
    }, 500);
  }
 
}