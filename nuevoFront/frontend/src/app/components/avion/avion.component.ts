import { Component, OnInit } from '@angular/core';
import { AvionService } from 'src/app/services/avion.service';
import { NgForm } from '@angular/forms';
import { Avion } from 'src/app/models/avion';
import { BancoService } from 'src/app/services/banco.service';
import { Cuenta } from 'src/app/models/cuenta';
import { VariableAst } from '@angular/compiler';

@Component({
  selector: 'app-avion',
  templateUrl: './avion.component.html',
  styleUrls: ['./avion.component.css']
})
export class AvionComponent implements OnInit {

  constructor(
    public avionService: AvionService,
    public bancoService: BancoService) { }

  ngOnInit(): void {
    this.getAviones();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getAviones(): void {

    this.avionService.getAviones().subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].disponible == true || this.isBooked(res[i]) == true) {
            this.avionService.aviones.push(res[i]);
          }
        }
      },
      err => console.error(err)
    );
  }

  addAvion(form: NgForm) {
    if (form.value._id) { //si el input oculto de id tiene un valor es que hay actualizar
      this.avionService.putAvion(form.value).subscribe(
        res => {
          window.location.reload();
        },
        err => console.log(err)
      );
    } else { //sino es que estamos creando
      this.avionService.createAvion(form.value).subscribe(
        res => {
          this.getAviones(); //hace que al añadir un avion se refresque y aparezca el nuevo
          form.reset(); //al añadir un avion, se vacian los inputs
          window.location.reload();
        },
        err => console.error(err)
      );
    }

  }

  deleteAvion(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminarlo?')) {
      this.avionService.deleteAvion(id).subscribe(
        res => this.getAviones(),
        err => console.log(err)
      );
    }
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

  editAvion(avion: Avion) {
    this.avionService.selectedAvion = avion; //hace que se rellene el formulario con los datos del avion a editar

  }

  isLogged() {
    if (localStorage.getItem('token') == null) {
      return false;
    } else {
      return true;
    }
  }

  isBooked(avion: Avion) {

    if (localStorage.getItem('avionReservado') == avion._id) {
      return true;
    } else {
      return false;
    }

  }

  anularReserva(avion: Avion) {
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

  /*   isDisponible(avion: Avion){
      if(avion.disponible == false){
        return false;
      }else{
        return true;
      }
    }
   */


}
