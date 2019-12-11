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

  getSpeciesIcon(species:string):string{
    let speciesIcon:string;
    switch (species.toLowerCase().includes('human')) {
      case true:
        speciesIcon = 'logo-octocat'
        break;
      default:
        speciesIcon = 'logo-redit'
        break;
    }
    return speciesIcon;
  }
  getStatusIcon(status:string):string{
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
