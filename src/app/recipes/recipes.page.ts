import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.sass'],
})
export class RecipesPage implements OnInit {

  constructor(private recipeServ:RecipesService) { }

  ngOnInit() {
    this.recipeServ.getPeople();
  }

}
