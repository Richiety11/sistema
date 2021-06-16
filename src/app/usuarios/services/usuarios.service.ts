import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"; //peticiones al backend
import { Observable, BehaviorSubject, Subject } from 'rxjs'; //Manejo de tokens en el servidor
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { UsuariosI } from '../models/usuarios';
import { TokenI } from "../models/token";
import { LoginComponent } from '../components/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  AUTH_SERVER: string = 'http://localhost:3100/api/';
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

  constructor(private httpClient: HttpClient) { }
  //Funcion que almacena en el localstorage del navegador
  //el token y la fecha de expiracion

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

  //Funcion que regresa verdadero si se encuentra un token en memoria
  //Y guarda la url enviada como parametro a la variable urlUsuarioIntentaAcceder
  //En caso de encontrar el token 
  //En caso contrario solo regresa false (el usuario no se ha logeado)
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

  private getToken():string {
    if (this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }//Fin de getToken

  getUsers(){
    return this.httpClient.get(
      this.AUTH_SERVER+'users',
      {
        headers: new HttpHeaders({
            'Authorization': 'token-auth '+ this.getToken()
        })
      }
    )
  }//Fin de getUsers

  //Obtener los datos de un usuario
  getUser(id:string){
    return this.httpClient.get(
      this.AUTH_SERVER+'users/'+id,
      {
        headers: new HttpHeaders({
            'Authorization': 'token-auth '+ this.getToken()
        })
      }
    )
  }
}//Class usuarioservices