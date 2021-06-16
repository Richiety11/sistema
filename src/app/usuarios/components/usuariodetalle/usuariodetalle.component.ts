import { Component, OnInit } from '@angular/core';
//Para obtener los parametros de la url con el id del usuario
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosI } from '../../models/usuarios';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-usuariodetalle',
  templateUrl: './usuariodetalle.component.html',
  styleUrls: ['./usuariodetalle.component.css']
})
export class UsuariodetalleComponent implements OnInit {

  id:any='';//PAra obtener el id del usuario
  usuario: UsuariosI | undefined;
  constructor(private router:Router,
              private activatedRoute: ActivatedRoute,
              private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    //console.log(this.id)
    this.getUser(this.id)
  }

  //Obtener los datos del usuario por id
  getUser(id:string){
    this.usuariosService.getUser(id)
                        .subscribe(res =>{
                          this.usuario = res as UsuariosI;
                          console.log(this.usuario);
                        })
  }

}
