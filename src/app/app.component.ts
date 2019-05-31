import { Component } from '@angular/core';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedemo';
  pokemon: Pokemon;
  isReady: boolean = false;

  associerPokemon(pkmn: Pokemon) {
    this.pokemon = pkmn;
    this.isReady = true;
  }
}
