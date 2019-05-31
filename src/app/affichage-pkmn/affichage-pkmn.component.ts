import { Component, OnInit, Input } from '@angular/core';
import { PokeAPIService } from '../poke-api.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-affichage-pkmn',
  templateUrl: './affichage-pkmn.component.html',
  styleUrls: ['./affichage-pkmn.component.css']
})
export class AffichagePkmnComponent implements OnInit {

  @Input() pokemon: Pokemon;
  ListeLabelsStats: String[] = ["PV", "Attaque", "Défense", "Attaque Spéciale", "Défense Spéciale","Vitesse"];

  constructor(private pokeAPIService: PokeAPIService) { }

  ngOnInit() {
  }

  jouerCri(pkmnID: string) {
    var audio = new Audio('assets/cries/'+pkmnID+'.ogg');
    audio.play();
    audio.volume = 0.1;
  }
  


}
