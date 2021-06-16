import { FormGroup } from '@angular/forms';

//Validador para hacer que coincidan los dos campos con el password
export function mustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) =>{
        //Asignamos a dos variables los elementos del formulario para validar
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if(matchingControl.errors && !matchingControl.errors.mustMatch){
            //Ejecutamos return si otro validador ha encontrado errores
            //en el control de errores matchinControl
            return;
        }

        //Establecemos el control de errores matchingControl
        //En verdadero si la validacion falla, es decir si los
        //password no coinciden
        if (control.value !== matchingControl.value)
            matchingControl.setErrors({mustMatch: true});
        else //Los password son iguales y no hay error
            matchingControl.setErrors(null);
    }//return
}//Fin de function mustMatch