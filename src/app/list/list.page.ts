import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { Character } from './character.model';
import { CharacterService } from './character.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.sass'],
})
export class ListPage implements OnInit, OnDestroy {

  private recipes:Character[] = [];  

  private charSub:Subscription = new Subscription();
  constructor(private characterService:CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacters();
    this.charSub = this.characterService.characterSubject.subscribe(recipes=>{
      this.recipes.push(...recipes);
    });
  }
  ngOnDestroy(): void {
    this.charSub.unsubscribe();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.characterService.getCharacters();
      event.target.complete();
    }, 500);
  }
 
}