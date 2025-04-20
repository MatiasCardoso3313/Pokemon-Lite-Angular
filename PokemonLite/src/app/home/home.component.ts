import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ProductService } from '../services/product/product.service';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngOnInit() {
    this.getUser();
    this.route.queryParams.subscribe(params => {
      this.idUsuario = +params['id'];
    });
  }

  idUsuario: number | undefined;
  datosUsuario: any;
  pokemonsUsuario: any[] = [];
  constructor(private route: ActivatedRoute, private authService: AuthService, private productService: ProductService){}
  
  getUser(): void{
    this.authService.enviarDatos().subscribe(
      respuesta => {
        const usuario = respuesta.find((item: any) => String(item.id) === String(this.idUsuario));
        this.datosUsuario = usuario.datos[0];
        this.agregarPokemonPorNumero();
      })
  }  

  agregarPokemonPorNumero(){
    const pokemones = this.datosUsuario.pokemons;
    for (let pokemon of pokemones)
      this.productService.getPokemonById(pokemon.number).subscribe({
        next: (pokemon) => {
          this.pokemonsUsuario.push(pokemon);
        }
      });
  }

  getTipos(pokemon: any): string {
    return pokemon.types.map((t: any) => t.type.name);
  }
}
