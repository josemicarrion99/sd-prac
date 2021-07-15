import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { NgForm } from '@angular/forms';
import { Hotel } from 'src/app/models/hotel';
import { BancoService } from 'src/app/services/banco.service';
import { Cuenta } from 'src/app/models/cuenta';
import { VariableAst } from '@angular/compiler';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  constructor(
    public hotelService: HotelService,
    public bancoService: BancoService) { }

  ngOnInit(): void {
    this.getHoteles();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getHoteles(): void {

    this.hotelService.getHoteles().subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].disponible == true || this.isBooked(res[i]) == true) {
            this.hotelService.hoteles.push(res[i]);
          }
        }
      },
      err => console.error(err)
    );
  }

  /*   addHotel(form: NgForm) {
      if (form.value._id) { //si el input oculto de id tiene un valor es que hay actualizar
        this.hotelService.putHotel(form.value).subscribe(
          res => {
            window.location.reload();
          },
          err => console.log(err)
        );
      } else { //sino es que estamos creando
        this.hotelService.createHotel(form.value).subscribe(
          res => {
            this.getHoteles(); //hace que al añadir un hotel se refresque y aparezca el nuevo
            form.reset(); //al añadir un hotel, se vacian los inputs
            window.location.reload();
          },
          err => console.error(err)
        );
      }
  
    } */

  deleteHotel(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminarlo?')) {
      this.hotelService.deleteHotel(id).subscribe(
        res => this.getHoteles(),
        err => console.log(err)
      );
    }
  }

  reservarHotel(form: NgForm, hotel: Hotel) {

    const auxTarjetaUsu = localStorage.getItem('tarjetaCreditoSesionActual');
    const auxCorreoUsu = localStorage.getItem('emailSesionActual');
    var auxCuenta: Cuenta;

    auxCuenta = {
      correoDelTitular: "",
      saldo: 0,
      codigo: "",
      _id: ""
    }

    console.log(form.value);
    console.log(hotel);

    this.bancoService.getCuentas().toPromise().then(
      (cuentas) => {
        cuentas.forEach(element => {
          if (element.correoDelTitular == auxCorreoUsu && element.codigo == auxTarjetaUsu) {
            auxCuenta = element;
            console.log("Elemento");
            console.log(element);


            auxCuenta.saldo = auxCuenta.saldo - hotel.precio;

            if (auxCuenta.saldo > 0 && hotel.disponible == true) {
              console.log("El saldo sera " + auxCuenta.saldo);

              if (confirm('¿Estás seguro de que quieres reservar estas fechas?')) {
                hotel.reservadoDesde = form.value.reservarDesde;
                hotel.reservadoHasta = form.value.reservarHasta;
                hotel.disponible = false;

                console.log("Actualmente el hotel sera:");
                console.log(hotel);

                this.hotelService.putHotel(hotel).subscribe(
                  res => res,
                  err => err
                );

                this.bancoService.putCuenta(auxCuenta).subscribe(
                  res => res,
                  err => err
                );

                localStorage.setItem('hotelReservado', hotel._id);
              }
              //window.location.reload();


            } else {
              alert("No tiene suficiente dinero en la cuenta bancaria");

            }
          } else {
            alert("Problemas con su cuenta bancaria, contacte su banco");
          }
        });
      }
    )
  }

  editHotel(hotel: Hotel) {
    this.hotelService.selectedHotel = hotel; //hace que se rellene el formulario con los datos del hotel a editar

  }

  isLogged() {
    if (localStorage.getItem('token') == null) {
      return false;
    } else {
      return true;
    }
  }

  isBooked(hotel: Hotel) {

    if (localStorage.getItem('hotelReservado') == hotel._id) {
      return true;
    } else {
      return false;
    }

  }

  anularReserva(hotel: Hotel) {
    localStorage.removeItem('hotelReservado');

    const auxTarjetaUsu = localStorage.getItem('tarjetaCreditoSesionActual');
    const auxCorreoUsu = localStorage.getItem('emailSesionActual');
    var auxCuenta: Cuenta;

    auxCuenta = {
      correoDelTitular: "",
      saldo: 0,
      codigo: "",
      _id: ""
    }

    console.log(hotel);

    this.bancoService.getCuentas().toPromise().then(
      (cuentas) => {
        cuentas.forEach(element => {
          if (element.correoDelTitular == auxCorreoUsu && element.codigo == auxTarjetaUsu) {
            auxCuenta = element;

            auxCuenta.saldo = auxCuenta.saldo + hotel.precio;

            console.log("El saldo sera " + auxCuenta.saldo);

            hotel.disponible = true;
            hotel.reservadoDesde = undefined;
            hotel.reservadoHasta = undefined;

            console.log("Actualmente el hotel sera:");
            console.log(hotel);

            this.hotelService.putHotel(hotel).subscribe(
              res => res,
              err => err
            );

            this.bancoService.putCuenta(auxCuenta).subscribe(
              res => res,
              err => err
            );

            //window.location.reload();


          } else {
            alert("Problemas con su cuenta bancaria, contacte su banco");
          }
        });
      }
    )


  }

  /*   isDisponible(hotel: Hotel){
      if(hotel.disponible == false){
        return false;
      }else{
        return true;
      }
    }
   */


}
