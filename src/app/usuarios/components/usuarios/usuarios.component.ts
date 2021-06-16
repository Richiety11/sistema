import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { UsuariosI } from '../../models/usuarios';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Importar los validadores personalizados para validar el password
//y confirmar que los password coinciden
import { mustMatch } from '../../helpers/must-match-validator';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  //Variable para el modal
  closeResult = '';


  //Variable para el formulario

  public registerForm!: FormGroup;
  public submitted = false;

  //Arreglo que contendra todos los usuarios de la bd
  public users:any = [];

  constructor(private usuariosService: UsuariosService,
              private router: Router,
              public modal: NgbModal,
              private formBuilder: FormBuilder) {
    this.users = new Array()
  }

  ngOnInit(): void {
    //Agregamos al inicializar el componente el validador para el nombre
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', [Validators.required, Validators.minLength(6) ] ],
      passwordconfirm: ['', Validators.required ],
      tipo: ['', Validators.required]
    },
    {
      validator: mustMatch('password', 'passwordconfirm')
    }
    );
    this.getUsers();
  }//Fin de ngOnInit

  //metodo getter para un facil acceso a los campos del formulario
  get fields(){
    return this.registerForm?.controls;
  }//Fin de fields

  onSubmit(){
    this.submitted = true;

    //Detener la ejecucion si la forma no es valida
    if(this.registerForm?.invalid){
      return;
    }
  }//fin de onSubmit

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

