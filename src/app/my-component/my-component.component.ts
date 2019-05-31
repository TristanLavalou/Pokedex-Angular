import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokeAPIService } from '../poke-api.service';
import { Pokemon } from '../pokemon';
import { Observable, Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent implements OnInit {

  // Export vers un autre composant
  @Output() affichagePokemonDemandé = new EventEmitter<Pokemon>();


  constructor(private pokeAPIService: PokeAPIService, private _snackBar: MatSnackBar) { }

  pkmnSubscription: Subscription;
  pkmnFullList: Pokemon[] = [];
  pokemon: Pokemon;
  pkmnArray: Array<any>;
  isEnded: boolean = false;
  isLoaded: boolean = false;
  myControl = new FormControl();
  filteredOptions: Observable<Pokemon[]>;

  // Fonctions "utilitaires"
  sleepSYNC(temps){
    return new Promise(function(resolve, reject) { setTimeout(function() { resolve('fini');}, temps);});
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // Se déclenche au lancement de la page. Ici, on va vouloir charger toutes les données nécessaires à l'affichage dans l'autocomplete.
  ngOnInit() {
    // Première requête pour récupérer le nom et l'ID de tous les Pokémon
    this.pkmnSubscription = this.pokeAPIService.getAllPokemon().subscribe(
      (data:any) => {
        this.pkmnArray = data.pokemon_entries;
        for(var i=0;i<this.pkmnArray.length;i++) {
          // Deuxième requête pour récupérer les sprites. Le front_default est en effet utilisé dans l'autocomplete.
          this.pkmnSubscription = this.pokeAPIService.getPokemonInfo(this.pkmnArray[i].entry_number).subscribe(
            (data:any) => {
              var spritesTab: string[] = [];
              spritesTab.push(data.sprites.front_default);
              this.pkmnFullList[data.id-1].setSprite(spritesTab);
            }
          );
          this.pkmnSubscription = this.pokeAPIService.getPokemonInternational(this.pkmnArray[i].entry_number).subscribe(
            (data:any) => {
              var namesTab: string[] = [null,null,null];
              for (var i=0;i<data.names.length;i++) {
                if (data.names[i].language.name=="en") {
                  namesTab[0] = data.names[i].name;
                }
                if (data.names[i].language.name=="fr") {
                  namesTab[1] = data.names[i].name;
                }
                if (data.names[i].language.name=="ja") {
                  namesTab[2] = data.names[i].name;
                }
              }
              this.pkmnFullList[data.id-1].setNames(namesTab);
            }
          );
          this.pkmnFullList.push(new Pokemon(this.pkmnArray[i].entry_number,this.pkmnArray[i].pokemon_species.name,null));
          //Par sécurité, on push au minimum le nom anglais en minuscule
        }
        this.isEnded = true;
      }
    );


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.pkmnFullList.slice())
    );
  }
  
  displayFn(pkmn?: Pokemon): string | undefined {
    return pkmn ? pkmn.names[1] : undefined;
  }

  private _filter(name: string): Pokemon[] {
    const filterValue = name.toLowerCase();

    return this.pkmnFullList.filter(option => option.names[1].toLowerCase().indexOf(filterValue) === 0);
  }

  async onClickSearch(pkmnid: number) {
    console.log("ID :"+pkmnid);
    if (pkmnid != null && pkmnid>=1 && pkmnid<=this.pkmnFullList.length) {
      this.pkmnSubscription = this.pokeAPIService.getPokemonInfo(String(pkmnid)).subscribe(
        (data:any) => {
          var pkmnStats: string[] = [];
          var spritesTab: string[] = [];
          for (var i=0;i<data.stats.length;i++) {
            pkmnStats.push(data.stats[i].base_stat);
          }
          spritesTab.push(data.sprites.front_default);
          spritesTab.push(data.sprites.back_default);
          spritesTab.push(data.sprites.front_shiny);
          spritesTab.push(data.sprites.back_shiny);

          if (data.types[1]==undefined) {
            this.pokemon = new Pokemon(data.id, data.name, data.types[0].type.name, null, spritesTab, pkmnStats);
          }
          else {
            this.pokemon = new Pokemon(data.id, data.name, data.types[0].type.name, data.types[1].type.name, spritesTab, pkmnStats);
          }
            this.isLoaded = true;
        }
      );
      await this.sleepSYNC(100);
      // PROMISE POUR FORCER LE SYNCHRONE ICI
      this.pkmnSubscription = this.pokeAPIService.getPokemonInternational(String(pkmnid)).subscribe(
        (data:any) => {
          for (var i=0;i<data.flavor_text_entries.length;i++) {
            if (data.flavor_text_entries[i].language.name=="fr") {
              this.pokemon.setDescriptions(data.flavor_text_entries[i].flavor_text);
            }
          }
          var namesTab: string[] = [null,null,null];
          for (var i=0;i<data.names.length;i++) {
            if (data.names[i].language.name=="en") {
              namesTab[0] = data.names[i].name;
            }
            if (data.names[i].language.name=="fr") {
              namesTab[1] = data.names[i].name;
            }
            if (data.names[i].language.name=="ja") {
              namesTab[2] = data.names[i].name;
            }
          }
          this.pokemon.setNames(namesTab);
          this.affichagePokemonDemandé.emit(this.pokemon); 
        }
      );
      this.pkmn_selected=this.pkmnFullList[pkmnid-1];
    }
    else {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 2500,
      });
    }
  }

  onLog(value) {
    console.log(value);
  }

  id: string = '';
  names: string = '';
  pkmn_selected;
}



@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [],
})
export class SnackBarComponent {}