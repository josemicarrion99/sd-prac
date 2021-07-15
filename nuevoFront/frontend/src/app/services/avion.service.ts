import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Avion } from '../models/avion';

@Injectable({
  providedIn: 'root'
})
export class AvionService {

  aviones: Avion[];
  selectedAvion: Avion;

  URL_API = 'https://localhost:3000/api/aviones' //3000 porque es donde se está ejecutando la agencia


  constructor(private http: HttpClient) {
    this.aviones = [];
    this.selectedAvion = {
      salida: "",
      destino: "",
      precio: 0,
      soloIda: false,
      disponible: true,
      _id: "",
    };
  }

  
  getAviones(){
    return this.http.get<Avion[]>(this.URL_API);
  }
  
  getAvion(_id: string){
    return this.http.get<Avion>(`${this.URL_API}/${_id}`);
  }

  createAvion(avion: Avion){
    var cabecera = {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")}; //como tiene restriccion el crear avion, le envio el token para que permita ser usado

    return this.http.post(this.URL_API, avion, cabecera);
  }

  deleteAvion(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  putAvion(avion: Avion){
    var cabecera = {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")};

    return this.http.put(`${this.URL_API}/${avion._id}`, avion, cabecera);
  }
}
