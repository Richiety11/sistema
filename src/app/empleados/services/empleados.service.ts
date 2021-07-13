import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Empleados } from '../models/empleados';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UsuariosI } from 'src/app/usuarios/models/usuarios';
import { TokenI } from 'src/app/usuarios/models/token';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  AUTH_SERVER = 'http://localhost:3100/api/';
  authSubject = new BehaviorSubject(false);
  private token: any ='';

  public urlUsuarioIntentaAcceder = '';
  //Indica si el usuario ha iniciado sesion o finalizado sesion
  public changeLoginStatusSubject = new Subject<boolean>();
  //Observable crea una variable global en memoria y esta variable
  //Llamada changeLoginStatus$ monitorea cualquier cambio en la variable
  //Y la actualiza en memoria
  public changeLoginStatus$ = this. changeLoginStatusSubject.asObservable();

  //Variable globar que almacena el nombre del usuario
  public changeUserNameSubject = new Subject<String>();
  public changeUserName$ = this.changeUserNameSubject.asObservable();

  //Variable para intercambiar los datos con el formulario
  empleado: Empleados ;

  //Variable para almacenar todos los empleados
  empleados: Empleados [];

  constructor(private httpClient: HttpClient){
    this.empleado = new Empleados();
    this.empleados = new Array();
  }

  login(user: UsuariosI): Observable<TokenI>{
    return this.httpClient.post<TokenI>(this.AUTH_SERVER+'login', user)
          .pipe(tap(
            (res) =>{
              if (res.success){ //Success = true <- usuario y contraseña correctas
                var decoded: any = jwt_decode(res.token);
                //Guardamos el nombre del usuario en la variable global
                var userName = decoded.user.name;
                this.changeUserNameSubject.next(userName);
                //Guardamos el token en localstorage
                this.saveToken(res.token, decoded.exp);
                //Cambiamos la variable global de inicio de sesion a True
                this.changeLoginStatusSubject.next(true);
              }
            return this.token;
          })
        );
  }//Function Login

  isLogged(url:string):boolean{
    const isLogged = localStorage.getItem("ACCESS_TOKEN");
    if (!isLogged){ //No hay token en memoria
      this.urlUsuarioIntentaAcceder = url;
      return false;
    }
    return true;
  }//Fin de isLogged

  logout():void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    //El usuario cerro sesión
    this.changeLoginStatusSubject.next(false);
  }//Fin de Logout

  private saveToken(token:string, expiresIn:string):void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }//Fin de sabe token

  public getToken():string {
    if (this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }//Fin de getToken

  //Obtener todos los empleados
  getEmpleados(){
    return this.httpClient.get(
      this.AUTH_SERVER+'empleados',
      {
        headers: new HttpHeaders({
          'Authorization': 'token-auth '+ this.getToken()
        })
      }
      );
  }

  //Agreagar un empleado a la base de datos
  addEmpleado(empleado: Empleados){
    return this.httpClient.post(this.AUTH_SERVER,empleado);
  }

  //Modificar un empleado
  updateEmpleado(empleado: Empleados){
    return this.httpClient.put(this.AUTH_SERVER + '/' + empleado._id,empleado);
  }

  //Eliminar un empleado
  deleteEmpleado(_id:String){
    return this.httpClient.delete(this.AUTH_SERVER + '/' + _id);
  }
}

