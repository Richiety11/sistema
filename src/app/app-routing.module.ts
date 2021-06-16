import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Regla que indica que cuando el usuario teclee una ruta no valida
//El sistema se redirija a visualizar el componente empleados
const routes: Routes = [
  {
    path: '**', redirectTo: '/empleados', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
