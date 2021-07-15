import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Usuario;

  URL_API = 'https://localhost:3000/api/usuarios' //3000 porque es donde se está ejecutando la agencia
  //URL_API = 'https://172.20.42.16:3000/api/usuarios' //3000 porque es donde se está ejecutando la agencia

  constructor(
    private http: HttpClient, 
    private router: Router) 
  {
    this.user = {
      email: "",
      password: "",
      nombre: "",
      tarjetaCredito: "",
      _id: "",
    };

  }

  isLogged(){
    if(localStorage.getItem('token') == null){
      return false;
    }else{
      return true;
    }

  }

  //get tokens
  signIn(user: Usuario){
    return this.http.post<any>(this.URL_API + '/tokens', user);
  }

  //post usuario
  signUp(user: Usuario){
    return this.http.post<any>(this.URL_API, user);
  }

  getUsuarios(){
    var cabecera = {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")};

    return this.http.get<Usuario[]>(this.URL_API, cabecera);
  }







}
