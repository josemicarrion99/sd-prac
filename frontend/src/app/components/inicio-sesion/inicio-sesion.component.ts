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
      saldo: 0,
      _id: "",
      createdAt: "",
      updatedAt: "",
    };

  }

  ngOnInit(): void {
  }

  signIn(form: NgForm){
    this.authService.signIn(this.user)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', `Bearer ${res.token}`);
        // this.router.navigate(['/private'])
      },
      err => console.log(err)
    )
    
  }

}
