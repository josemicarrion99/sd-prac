import { Component, OnInit } from '@angular/core';
import { AvionService } from 'src/app/services/avion.service';
import { CocheService } from 'src/app/services/coche.service';
import { HotelService } from 'src/app/services/hotel.service';

import { BancoService } from 'src/app/services/banco.service';
import { Avion } from 'src/app/models/avion';
import { Hotel } from 'src/app/models/hotel';
import { Coche } from 'src/app/models/coche';
import { Cuenta } from 'src/app/models/cuenta';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  constructor(
    public cocheService: CocheService,
    public avionService: AvionService,
    public hotelService: HotelService,
    public bancoService: BancoService
  ) { }

  ngOnInit(): void {
    this.getCoches();
    this.getAviones();
    this.getHoteles();
  }

  getCoches() {
    this.cocheService.getCoches().subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].correoComprador ==  localStorage.getItem('emailSesionActual')) {
            this.cocheService.coches.push(res[i]);
          }
        }
      },
      err => console.error(err)
    );
  }

  getHoteles() {
    this.hotelService.getHoteles().subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].correoComprador ==  localStorage.getItem('emailSesionActual')) {
            this.hotelService.hoteles.push(res[i]);
          }
        }
      },
      err => console.error(err)
    );

  }
  getAviones() {
    this.avionService.getAviones().subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].correoComprador ==  localStorage.getItem('emailSesionActual')) {
            this.avionService.aviones.push(res[i]);
          }
        }
      },
      err => console.error(err)
    );

  }

  isLogged() {
    if (localStorage.getItem('token') == null) {
      return false;
    } else {
      return true;
    }
  }

  isBookedAvion(avion: Avion) {

    if (localStorage.getItem('avionReservado') == avion._id) {
      return true;
    } else {
      return false;
    }

  }

  isBookedCoche(coche: Coche) {

    if (localStorage.getItem('cocheReservado') == coche._id) {
      return true;
    } else {
      return false;
    }
  }

  isBookedHotel(hotel: Hotel) {

    if (localStorage.getItem('hotelReservado') == hotel._id) {
      return true;
    } else {
      return false;
    }
  }

  anularReservaHotel(hotel: Hotel) {
    localStorage.setItem('hotelReservado', "");

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
            hotel.correoComprador = "";

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
                hotel.correoComprador = localStorage.getItem('emailSesionActual');

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

  anularReservaAvion(avion: Avion) {
    localStorage.setItem('avionReservado', "");

    const auxTarjetaUsu = localStorage.getItem('tarjetaCreditoSesionActual');
    const auxCorreoUsu = localStorage.getItem('emailSesionActual');
    var auxCuenta: Cuenta;

    auxCuenta = {
      correoDelTitular: "",
      saldo: 0,
      codigo: "",
      _id: ""
    }

    console.log(avion);

    this.bancoService.getCuentas().toPromise().then(
      (cuentas) => {
        cuentas.forEach(element => {
          if (element.correoDelTitular == auxCorreoUsu && element.codigo == auxTarjetaUsu) {
            auxCuenta = element;

            auxCuenta.saldo = auxCuenta.saldo + avion.precio;

            console.log("El saldo sera " + auxCuenta.saldo);

            avion.disponible = true;
            avion.reservadoDesde = undefined;
            avion.reservadoHasta = undefined;
            avion.correoComprador = "";


            console.log("Actualmente el avion sera:");
            console.log(avion);

            this.avionService.putAvion(avion).subscribe(
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

  reservarAvion(form: NgForm, avion: Avion) {

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
    console.log(avion);

    this.bancoService.getCuentas().toPromise().then(
      (cuentas) => {
        cuentas.forEach(element => {
          if (element.correoDelTitular == auxCorreoUsu && element.codigo == auxTarjetaUsu) {
            auxCuenta = element;
            console.log("Elemento");
            console.log(element);

            if (form.value.soloIda == true) {
              auxCuenta.saldo = auxCuenta.saldo - avion.precio;
            } else {
              auxCuenta.saldo = auxCuenta.saldo - (2 * avion.precio);
            }


            if (auxCuenta.saldo > 0 && avion.disponible == true) {
              console.log("El saldo sera " + auxCuenta.saldo);

              if (confirm('¿Estás seguro de que quieres reservar estas fechas?')) {
                avion.reservadoDesde = form.value.reservarDesde;
                avion.reservadoHasta = form.value.reservarHasta;
                avion.disponible = false;
                avion.soloIda = form.value.soloIda;
                avion.correoComprador = localStorage.getItem('emailSesionActual');

                console.log("Actualmente el avion sera:");
                console.log(avion);

                this.avionService.putAvion(avion).subscribe(
                  res => res,
                  err => err
                );

                this.bancoService.putCuenta(auxCuenta).subscribe(
                  res => res,
                  err => err
                );

                localStorage.setItem('avionReservado', avion._id);
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

  anularReservaCoche(coche: Coche) {
    localStorage.setItem('cocheReservado', "");

    const auxTarjetaUsu = localStorage.getItem('tarjetaCreditoSesionActual');
    const auxCorreoUsu = localStorage.getItem('emailSesionActual');
    var auxCuenta: Cuenta;

    auxCuenta = {
      correoDelTitular: "",
      saldo: 0,
      codigo: "",
      _id: ""
    }

    console.log(coche);

    this.bancoService.getCuentas().toPromise().then(
      (cuentas) => {
        cuentas.forEach(element => {
          if (element.correoDelTitular == auxCorreoUsu && element.codigo == auxTarjetaUsu) {
            auxCuenta = element;

            auxCuenta.saldo = auxCuenta.saldo + coche.precio;

            console.log("El saldo sera " + auxCuenta.saldo);

            coche.disponible = true;
            coche.reservadoDesde = undefined;
            coche.reservadoHasta = undefined;
            coche.correoComprador = "";

            console.log("Actualmente el coche sera:");
            console.log(coche);

            this.cocheService.putCoche(coche).subscribe(
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

  reservarCoche(form: NgForm, coche: Coche) {

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
    console.log(coche);

    this.bancoService.getCuentas().toPromise().then(
      (cuentas) => {
        cuentas.forEach(element => {
          if (element.correoDelTitular == auxCorreoUsu && element.codigo == auxTarjetaUsu) {
            auxCuenta = element;
            console.log("Elemento");
            console.log(element);


            auxCuenta.saldo = auxCuenta.saldo - coche.precio;

            if (auxCuenta.saldo > 0 && coche.disponible == true) {
              console.log("El saldo sera " + auxCuenta.saldo);

              if (confirm('¿Estás seguro de que quieres reservar estas fechas?')) {
                coche.reservadoDesde = form.value.reservarDesde;
                coche.reservadoHasta = form.value.reservarHasta;
                coche.disponible = false;
                coche.correoComprador = localStorage.getItem('emailSesionActual');

                console.log("Actualmente el coche sera:");
                console.log(coche);

                this.cocheService.putCoche(coche).subscribe(
                  res => res,
                  err => err
                );

                this.bancoService.putCuenta(auxCuenta).subscribe(
                  res => res,
                  err => err
                );

                localStorage.setItem('cocheReservado', coche._id);
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

}
