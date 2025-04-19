import { Component } from '@angular/core';
import { ProductsComponent } from '../componentes/products/products.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  idUsuario: number | undefined;
  datosUsuario: any;

  constructor(private route: ActivatedRoute, private authService: AuthService){}

  getUser(): void{
    if(this.idUsuario != undefined){
      this.authService.enviarDatos(this.idUsuario).subscribe(datos => {
        this.datosUsuario = datos;
      })
    }
  }

  ngOnInit() {
    this.getUser();
    console.log(this.datosUsuario);
    this.route.queryParams.subscribe(params => {
      this.idUsuario = +params['id'];
      console.log('ID del usuario logueado:', this.idUsuario);
    });
  }
}
