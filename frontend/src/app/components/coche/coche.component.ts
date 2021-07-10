import { Component, OnInit } from '@angular/core';
import { CocheService } from 'src/app/services/coche.service';
import { NgForm } from '@angular/forms';
import { Coche } from 'src/app/models/coche';

@Component({
  selector: 'app-coche',
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.css']
})
export class CocheComponent implements OnInit {

  constructor(public cocheService: CocheService) { }

  ngOnInit(): void {
    this.getCoches();
  }

  resetForm(form: NgForm){
    form.reset();
  }

  getCoches(): void {
    this.cocheService.getCoches().subscribe(
      res => {
        this.cocheService.coches = res;
      }, 
      err => console.error(err)
    );
  }

  addCoche(form: NgForm){
    if(form.value._id){ //si el input oculto de id tiene un valor es que hay actualizar
      this.cocheService.putCoche(form.value).subscribe(
        res => {
          window.location.reload();
        },
        err => console.log(err)
      );
    }else{ //sino es que estamos creando
      this.cocheService.createCoche(form.value).subscribe(
        res => {
          this.getCoches(); //hace que al añadir un coche se refresque y aparezca el nuevo
          form.reset(); //al añadir un coche, se vacian los inputs
          window.location.reload();
        },
        err => console.error(err)
      );
    }

  }

  deleteCoche(id: string){
    if(confirm('¿Estás seguro de que quieres eliminarlo?')){
      this.cocheService.deleteCoche(id).subscribe(
        res => this.getCoches(),
        err => console.log(err)
        );
    }    
  }

  editCoche(coche: Coche){
    this.cocheService.selectedCoche = coche; //hace que se rellene el formulario con los datos del coche a editar

  }



}
