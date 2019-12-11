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
  private currentPage:number = 1;
  private charSub:Subscription = new Subscription();
  constructor(private characterService:CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacters(this.currentPage);
    this.charSub = this.characterService.characterSubject.subscribe(characters=>{
      this.recipes.push(...characters);
    });
  }
  ngOnDestroy(): void {
    this.charSub.unsubscribe();
  }

  loadData(event) {
    this.currentPage++;
    setTimeout(() => {
      console.log('Done');
      this.characterService.getCharacters(this.currentPage);
      event.target.complete();
    }, 500);
  }
 
}