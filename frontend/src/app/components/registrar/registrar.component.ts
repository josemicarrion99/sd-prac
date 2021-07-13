import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  user : Usuario;
  constructor(
    private authService: AuthService,
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

  ngOnInit() {
  }

  signUp(form: NgForm) {

    this.authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', `Bearer ${res.token}`);
          // this.router.navigate(['/private']);
        },
        err => console.log(err)
      )
  }
}
