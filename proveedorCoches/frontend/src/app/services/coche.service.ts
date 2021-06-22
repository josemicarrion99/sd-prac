import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  coches: Coche[]; //| undefined;

  URL_API = 'http://localhost:3100/api/coches' //3100 porque es donde se está ejecutando el server de coche


  constructor(private http: HttpClient) {
    this.coches = [];
  }

  getCoches(){
    return this.http.get<Coche[]>(this.URL_API);
  }



}
