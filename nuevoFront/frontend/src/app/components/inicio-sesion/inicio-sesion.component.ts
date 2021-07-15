import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  user : Usuario;
  constructor(
    private authService : AuthService, 
    private router: Router) 
  { 
    this.user = {
      email: "",
      password: "",
      nombre: "",
      tarjetaCredito: "",
      _id: "",
    };

  }

  ngOnInit(): void {
  }

  signIn(form: NgForm){
    if(this.user.email == "" || this.user.password == ""){
      alert("Credenciales invalidas");
      return;
    }

    this.authService.signIn(this.user)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', `Bearer ${res.token}`);
        localStorage.setItem('emailSesionActual', this.user.email);

        this.authService.getUsuarios().toPromise().then(
          (cuentas) => {
            cuentas.forEach(element => {

              if (element.email == this.user.email) {
                localStorage.setItem('tarjetaCreditoSesionActual', element.tarjetaCredito);

              }
            });
          }
        )

        this.router.navigate(['/coches'])
      },
      err => console.log(err)
    )
    
  }

}
