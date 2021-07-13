import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './components/empleados/empleados.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from './services/empleados.service';

@NgModule({
  declarations: [
  
    EmpleadosComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    EmpleadosRoutingModule
  ],
  providers: [
    EmpleadosService
  ]
})
export class EmpleadosModule { }
