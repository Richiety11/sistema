import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../can-activate.guard';
import { LoginComponent } from './components/login/login.component';
import { UsuariodetalleComponent } from './components/usuariodetalle/usuariodetalle.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

//La ruta de usuarios estará en localhost:4200/usuarios
//Ruta hija mostrará:
//localhost:4200/usuarios/1 <-- muestra el ususario 1 y el 1 lo toma el id
const routes: Routes = [
  { path: 'usuarios', 
    component: UsuariosComponent, 
    canActivate: [CanActivateGuard],
    children: [
      {path: ':id', component: UsuariodetalleComponent,
    canActivate: [CanActivateGuard]
      }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
