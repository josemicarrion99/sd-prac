import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  coches: Coche[];
  selectedCoche: Coche;

  URL_API = 'https://localhost:3000/api/coches' //3000 porque es donde se está ejecutando la agencia
  //URL_API = 'https://172.20.42.16:3000/api/coches' //3000 porque es donde se está ejecutando la agencia

  constructor(private http: HttpClient) {
    this.coches = [];
    this.selectedCoche = {
      modelo: "",
      matricula: "",
      precio: 0,
      disponible: true,
      _id: "",

    };
  }

  
  getCoches(){
    return this.http.get<Coche[]>(this.URL_API);
  }
  
  getCoche(_id: string){
    return this.http.get<Coche>(`${this.URL_API}/${_id}`);
  }

  createCoche(coche: Coche){
    var cabecera = {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")}; //como tiene restriccion el crear coche, le envio el token para que permita ser usado

    return this.http.post(this.URL_API, coche, cabecera);
  }

  deleteCoche(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  putCoche(coche: Coche){
    var cabecera = {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")};

    return this.http.put(`${this.URL_API}/${coche._id}`, coche, cabecera);
  }
}
