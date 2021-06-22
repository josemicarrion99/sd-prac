import { Component, OnInit } from '@angular/core';
import { CocheService } from 'src/app/services/coche.service';

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

  getCoches(): void {
    this.cocheService.getCoches().subscribe(
      res => {
        this.cocheService.coches = res;
      }, 
      err => console.error(err)
    );
  }
}
