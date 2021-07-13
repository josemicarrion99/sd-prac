import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Usuario;

  URL_API = 'https://localhost:3000/api/usuarios' //3000 porque es donde se está ejecutando la agencia

  constructor(
    private http: HttpClient, 
    private router: Router) 
  {
    this.user = {
      email: "",
      password: "",
      nombre: "",
      tarjetaCredito: "",
      saldo: 0,
      _id: "",
      createdAt: "",
      updatedAt: "",
    };

  }

  //get tokens
  signIn(user: Usuario){
    return this.http.post<any>(this.URL_API + '/tokens', user);
  }

  //post usuario
  signUp(user: Usuario){
    return this.http.post<any>(this.URL_API, user);
  }




}
