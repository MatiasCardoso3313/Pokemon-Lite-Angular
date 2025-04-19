import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario='';
  contrasenia='';
  mensaje='';
  
  private router = inject(Router);
  constructor(private authService: AuthService) {}
  
  login() {
    this.authService.validarLogin(this.usuario, this.contrasenia).subscribe(valid =>{
      if (valid.encontrado){
        this.mensaje='Inicio de seión correcto';
        this.router.navigate(['/home'], { queryParams: { id: valid.id } });
      } else {
        this.mensaje='Usuario o contrasenia incorrectos';
      }
    })
  }
}
