import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { Empleados } from '../../models/empleados';
import { EmpleadosService } from '../../services/empleados.service';

declare var M:any; //any cualquier tipo de datos

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  constructor(public empleadoService: EmpleadosService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  addEmpleado(form: NgForm){
    //console.log("Hola");

    //Si existe un id significa que vamos a editar
    //Si no existe un id es = null significa que vamos a insertar un nuevo valor
    if(form.value._id){ //Si existe el id en el formulario actualizamos
      this.empleadoService.updateEmpleado(form.value)
                          .subscribe(res =>{
                            //console.log(response);
                            this.resetForm(form);
                            M.toast({html:'Empleado actualizado correctamente'});
                            this.getEmpleados();
                          })
    }else{//No existe el id, inserttamos un nuevo registro
      this.empleadoService.addEmpleado(form.value)
                          .subscribe(res => {
                          //console.log(response);
                          this.resetForm(form);
                          M.toast({html:'Empleado guardado correctamente'});
                          this.getEmpleados();
                        })
                      }//else
  };//Fin de addEmpleados

  getEmpleados(){
    this.empleadoService.getEmpleados()
                        .subscribe(res =>{
                          this.empleadoService.empleados = res as Empleados[];
                          console.log(res);
                        })
  }//Fin de getEmpleado

  editarEmpleado(empleado:Empleados){
    this.empleadoService.empleado = empleado;
  }//Fin de editar

  eliminarEmpleado(_id:String){
    if (confirm('Esta seguro de eliminar al empleado')){
      this.empleadoService.deleteEmpleado(_id)
                        .subscribe(response =>{
                          //console.log(response);
                          M.toast({html:'Empleado eliminado correctamente'});
                          this.getEmpleados();
                        })
    }//Fin de if confirm
  }//Fin de eliminarEmpleado

  resetForm(form?: NgForm){
    if (form){
      form.reset();
      this.empleadoService.empleado = new Empleados();
    }
  }//Fin de resetFrom

  exportarEmpleados(){
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px'
    });

    doc.text('Listado de empleados',15,15);
      const head = [['Nombre','Puesto','Departamento','Salario']]
    const listaEmpleados = new Array();
    for(var i in this.empleadoService.empleados){
      const empleado = [];
      empleado.push(this.empleadoService.empleados[i].nombre);
      empleado.push(this.empleadoService.empleados[i].puesto);
      empleado.push(this.empleadoService.empleados[i].departamento);
      empleado.push(this.empleadoService.empleados[i].salario);

      listaEmpleados.push(empleado);

    }
    autoTable(doc, {
      head: head,
      body: listaEmpleados
    })
  doc.save('empleados.pdf');
}
}

