import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogueado = false;
  userName:String='';

  constructor(public usuariosServices: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.usuariosServices.isLogged('');
    //Traemos el status del usuario de memoria global
    //Para saber si tiene una sesion activa
    this.usuariosServices.changeLoginStatus$.subscribe((loggedStatus:boolean)=>{
                                              this.usuarioLogueado = loggedStatus;
                                            })
    this.usuariosServices.changeUserName$.subscribe((userName:String)=>{
      this.userName = userName;
    })                                       
  }//Fin de ngOnInit
  logout(){
    this.usuariosServices.logout();
  }//Fin de logout

}
