import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL: string = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(private httpClient: HttpClient) {
  }
  getPokemon(): Observable<any> {
    return this.httpClient.get(this.API_URL).pipe(res => res);
  }
  getPokemonById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + `${id}/`);
  }
  
}