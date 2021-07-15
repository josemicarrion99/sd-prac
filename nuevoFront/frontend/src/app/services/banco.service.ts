import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuenta } from '../models/cuenta';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  cuenta: Cuenta;

  URL_API = 'https://localhost:3000/api/banco' //3000 porque es donde se está ejecutando la agencia

  constructor(private http: HttpClient) 
  {
    this.cuenta = {
      correoDelTitular: "",
      saldo: 0,
      codigo: "",
      _id: ""
    }

  }

  getCuentas(){
    return this.http.get<Cuenta[]>(this.URL_API);
  }
  
  getCuenta(_id: string){
    return this.http.get<Cuenta>(`${this.URL_API}/${_id}`);
  }

  putCuenta(cuenta: Cuenta){
    var cabecera = {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")};

    console.log(cuenta);
    return this.http.put(`${this.URL_API}/${cuenta._id}`, cuenta, cabecera);
  }

}
