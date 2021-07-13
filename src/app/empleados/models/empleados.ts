export class Empleados {
    _id: String;
  nombre: String;
  puesto: String;
  departamento: String;
  salario: number;
  
  constructor(_id: String = '',
              nombre:String = '',
              puesto:String = '',
              departamento:String = '',
              salario:number = 0
              ){
                this._id = _id;
                this.nombre = nombre;
                this.puesto = puesto;
                this.departamento = departamento;
                this.salario = salario;
              }
}
