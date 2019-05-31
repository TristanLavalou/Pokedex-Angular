import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  private baseUrl: string = 'https://pokeapi.co/api/v2'

  constructor(private http: HttpClient) {}

  // Récupère le nom et l'ID de tous les Pokémon du Pokédex National
  getAllPokemon() {
    const url = `${this.baseUrl}/pokedex/1`;
    return this.http.get(url);
  }

  // Récupère les informations de base d'un Pokémon
  getPokemonInfo(pkmnNumber: string) {
    const url = `${this.baseUrl}/pokemon/${pkmnNumber}`;
    return this.http.get(url);
  }

  // Récupère les noms et descriptions dans toutes les langues
  getPokemonInternational(pkmnNumber: string) {
    const url = `${this.baseUrl}/pokemon-species/${pkmnNumber}`;
    return this.http.get(url);
  }
}
