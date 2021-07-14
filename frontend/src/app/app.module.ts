import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CocheComponent } from './components/coche/coche.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { AvionComponent } from './components/avion/avion.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CocheComponent,
    AvionComponent,
    HotelComponent,
    InicioSesionComponent,
    RegistrarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'coches', component: CocheComponent},
      {path: 'hoteles', component: HotelComponent},
      {path: 'aviones', component: AvionComponent},
      {path: 'inicio-sesion', component: InicioSesionComponent},
      {path: 'registrar', component: RegistrarComponent},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
