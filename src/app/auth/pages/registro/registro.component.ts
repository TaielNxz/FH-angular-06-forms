import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorsService } from '../../../shared/validator/validators.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})

export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre   : [ '', [ Validators.required, Validators.pattern( this.vs.nombreApellidoPattern ) ] ],
    email    : [ '', [ Validators.required, Validators.pattern( this.vs.emailPattern ) ], [ this.emailValidator] ],
    username : [ '', [ Validators.required, this.vs.noPuedeSerStrider ] ],
    password : [ '', [ Validators.required, Validators.minLength(6) ] ],
    password2: [ '', [ Validators.required,  ] ],
  }, {
    validators: [ this.vs.camposIguales('password','password2') ]
  })

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?.required ) {
      return 'Email es obligatorio'
    } else if ( errors?.pattern ) {
      return 'El valor ingresdo no tiene el formato de correo'
    } else if ( errors?.emailTomado ) {
      return 'El email ya fue tomado';
    }

    return '';

  }

  constructor( private fb: FormBuilder,
               private vs: ValidatorsService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre   : 'Taiel Nunes',
      email    : 'test1@test.com',
      username : 'Nuxz ARG',
      password : '123456',
      password2: '123456'
    })
    
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
        && this.miFormulario.get(campo)?.touched
  }

  submitFormulario() {

    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();

  }

}
