import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../can-activate.guard';
import { EmpleadosComponent } from './components/empleados/empleados.component';

//Ruta localhost:4200/empleados
const routes: Routes = [
  {
    path: 'empleados',
    component: EmpleadosComponent, 
    canActivate: [CanActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
