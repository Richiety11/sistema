import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosService } from './services/usuarios.service';
import { UsuariodetalleComponent } from './components/usuariodetalle/usuariodetalle.component';
//Importamos nbBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UsuariosComponent,
    LoginComponent,
    UsuariodetalleComponent
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    UsuariosRoutingModule
  ],
  providers: [
    UsuariosService
  ]
})
export class UsuariosModule { }
