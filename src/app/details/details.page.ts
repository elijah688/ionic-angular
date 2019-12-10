import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character } from '../list/character.model';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../list/character.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.sass'],
})
export class DetailsPage implements OnInit, OnDestroy {


  private currentCharacter: Character;
  private charSub:Subscription = new Subscription();
  private paramsSub:Subscription = new Subscription();
  constructor(private characterServ: CharacterService ,private route:ActivatedRoute) { }

  ngOnInit() {
    this.paramsSub = this.route.paramMap.subscribe(params=>{
      const id:string = params.get('id');
      this.characterServ.getCharacter(id);
      this.charSub = this.characterServ.singleCharacterSubject.subscribe(char=>{
        this.currentCharacter = char;
        console.log(this.currentCharacter);
      })
    })
  }

  ngOnDestroy(): void {
    this.charSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }

  getPlanetIcon(origin:string):string{
    let planet:string;
    switch (origin.includes("Earth")) {
      case true:
        planet = 'globe'        
        break;
      default:
        planet='planet'
        break;
    }
    return planet;    
  }

  getGenderIcon(gender:string):string{
    let genderIcon:string;
    switch (gender) {
      case 'Male':
        genderIcon = 'male'        
        break;
      case 'Female':
        genderIcon = 'female'        
        break;
      default:
        genderIcon='transgender'
        break;
    }
    return genderIcon;    
  }

}
