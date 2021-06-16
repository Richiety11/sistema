import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { UsuariosI } from '../../models/usuarios';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  //Variable para el modal
  closeResult = '';

  //Arreglo que contendra todos los usuarios de la bd
  public users:any = [];

  constructor(private usuariosService: UsuariosService,
              private router: Router,
              public modal: NgbModal) { 
    this.users = new Array()
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usuariosService.getUsers()
                        .subscribe(res=>{
                            this.users = res as UsuariosService[];
                        })
  }//Fin de getUsers

  showUser(_id:string){
    this.router.navigate(['usuarios/'+_id]);
  }//Fin de showUser

  open(content:any) {
    this.modal.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

