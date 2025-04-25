import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  validarLogin(usuarioForm: string, contraseniaForm: string): Observable<{encontrado: boolean, id?: number}> {
    return this.http.get<any[]>('assets/usuarios.json').pipe(
      map(users => {
        const usuarioEncontrado = users.find 
        (usuario => usuario.usuario === usuarioForm 
          && usuario.contrasenia === contraseniaForm);
        if (usuarioEncontrado) {
          return { encontrado: true, id: usuarioEncontrado.id };
        } else {
          return { encontrado: false };
        }
      })
    );
  }
  
  enviarDatos(): Observable<any> {
    return this.http.get<any>('assets/pc.json'); 
  }
}
