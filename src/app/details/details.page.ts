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

  counter = 0;
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
      })
    })
  }

  ngOnDestroy(): void {
    this.charSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }

  getPlanetIcon(origin:string):string{
    let planet:string;
    switch (origin.substring(0,5).toLocaleLowerCase()) {
      case 'earth':
        planet = 'globe'        
        break;
      case 'unkno':
        planet = 'help'        
        break;
      default:
        planet='planet'
        break;
    }
    return planet;    
  }

  getGenderIcon(gender:string):string{
    let genderIcon:string;
    switch (gender.toLocaleLowerCase()) {
      case 'male':
        genderIcon = 'male'        
        break;
      case 'female':
        genderIcon = 'female'        
        break;
      default:
        genderIcon='help'
        break;
    }
    return genderIcon;    
  }

  getSpeciesIcon(species:string):string{
    let speciesIcon:string;
    switch (species.toLowerCase().substring(0,5)) {
      case 'human':
        speciesIcon = 'logo-octocat'
        break;
      case 'alien':
        speciesIcon = 'logo-reddit'
        break;
      default:
        speciesIcon = 'help'
        break;
    }
    return speciesIcon;
  }
  getStatusIcon(status:string):string{
    this.counter++
    let statusIcon:string;
    switch (status.toLowerCase()) {
      case 'dead':
        statusIcon = 'close-circle-outline'
        break;
      case 'alive':
        statusIcon = 'checkmark'
        break;
      default:
        statusIcon = 'help'
        break;
    }
    return statusIcon;
  }

}
