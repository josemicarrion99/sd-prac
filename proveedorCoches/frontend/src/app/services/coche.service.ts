import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  coches: Coche[];
  selectedCoche: Coche;

  URL_API = 'http://localhost:3100/api/coches' //3100 porque es donde se está ejecutando el server de coche


  constructor(private http: HttpClient) {
    this.coches = [];
    this.selectedCoche = {
      modelo: "",
      matricula: "",
      precio: 0,
      disponible: true,
      _id: "",
      createdAt: "",
      updatedAt: ""
    };
  }

  getCoches(){
    return this.http.get<Coche[]>(this.URL_API);
  }

  createCoche(coche: Coche){
    return this.http.post(this.URL_API, coche);

  }

  deleteCoche(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  putCoche(coche: Coche){
    return this.http.put(`${this.URL_API}/${coche._id}`, coche);
  }



}
