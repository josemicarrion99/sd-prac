import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  hoteles: Hotel[];
  selectedHotel: Hotel;

  URL_API = 'https://localhost:3000/api/hoteles' //3000 porque es donde se está ejecutando la agencia


  constructor(private http: HttpClient) {
    this.hoteles = [];
    this.selectedHotel = {
      direccion: "",
      personasHabitacion: "",
      precio: 0,
      disponible: true,
      _id: "",
    };
  }

  
  getHoteles(){
    return this.http.get<Hotel[]>(this.URL_API);
  }
  
  getHotel(_id: string){
    return this.http.get<Hotel>(`${this.URL_API}/${_id}`);
  }

  createHotel(hotel: Hotel){
    var cabecera = {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")}; //como tiene restriccion el crear hotel, le envio el token para que permita ser usado

    return this.http.post(this.URL_API, hotel, cabecera);
  }

  deleteHotel(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

  putHotel(hotel: Hotel){
    var cabecera = {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")};

    return this.http.put(`${this.URL_API}/${hotel._id}`, hotel, cabecera);
  }
}
