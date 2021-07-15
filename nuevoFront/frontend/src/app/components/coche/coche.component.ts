import { Component, OnInit } from '@angular/core';
import { CocheService } from 'src/app/services/coche.service';
import { NgForm } from '@angular/forms';
import { Coche } from 'src/app/models/coche';
import { BancoService } from 'src/app/services/banco.service';
import { Cuenta } from 'src/app/models/cuenta';
import { VariableAst } from '@angular/compiler';

@Component({
  selector: 'app-coche',
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.css']
})
export class CocheComponent implements OnInit {

  constructor(
    public cocheService: CocheService,
    public bancoService: BancoService) { }

  ngOnInit(): void {
    this.getCoches();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

  getCoches(): void {

    this.cocheService.getCoches().subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].disponible == true || this.isBooked(res[i]) == true) {
            this.cocheService.coches.push(res[i]);
          }
        }
      },
      err => console.error(err)
    );
  }

  /*   addCoche(form: NgForm) {
      if (form.value._id) { //si el input oculto de id tiene un valor es que hay actualizar
        this.cocheService.putCoche(form.value).subscribe(
          res => {
            window.location.reload();
          },
          err => console.log(err)
        );
      } else { //sino es que estamos creando
        this.cocheService.createCoche(form.value).subscribe(
          res => {
            this.getCoches(); //hace que al añadir un coche se refresque y aparezca el nuevo
            form.reset(); //al añadir un coche, se vacian los inputs
            window.location.reload();
          },
          err => console.error(err)
        );
      }
  
    } */

  deleteCoche(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminarlo?')) {
      this.cocheService.deleteCoche(id).subscribe(
        res => this.getCoches(),
        err => console.log(err)
      );
    }
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

  editCoche(coche: Coche) {
    this.cocheService.selectedCoche = coche; //hace que se rellene el formulario con los datos del coche a editar

  }

  isLogged() {
    if (localStorage.getItem('token') == null) {
      return false;
    } else {
      return true;
    }
  }

  isBooked(coche: Coche) {

    if (localStorage.getItem('cocheReservado') == coche._id) {
      return true;
    } else {
      return false;
    }

  }

  anularReserva(coche: Coche) {
    localStorage.removeItem('cocheReservado');

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

  /*   isDisponible(coche: Coche){
      if(coche.disponible == false){
        return false;
      }else{
        return true;
      }
    }
   */


}
