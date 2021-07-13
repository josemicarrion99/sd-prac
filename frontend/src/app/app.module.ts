import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CocheComponent } from './components/coche/coche.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CocheComponent,
    InicioSesionComponent,
    RegistrarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'coches', component: CocheComponent},
      {path: 'inicio-sesion', component: InicioSesionComponent},
      {path: 'registrar', component: RegistrarComponent},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
