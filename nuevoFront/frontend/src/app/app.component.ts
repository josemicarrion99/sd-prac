import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLogged(){
    if(localStorage.getItem('token') == null){
      return false;
    }else{
      return true;
    }
  }

  cerrarSesion(){
    localStorage.clear();
    window.location.reload();

  }
}
