import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group ({
    nombre:  [ "Taiel", [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this.fb.array([
      [ 'DOOM Eternal', Validators.required ],
      [ 'COD', Validators.required ],
    ], Validators.required )
  })

  nuevoFavorito: FormControl = this.fb.control('', Validators.required );

  
  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }
  
  constructor( private fb: FormBuilder ) { }

  // ===== Metodos ===== //

  campoNoEsValido( campo: string ) {
    return this.miFormulario.controls[campo].invalid
        && this.miFormulario.controls[campo].touched
  }

  agregarFavorito() {
    if( this.nuevoFavorito.invalid ) { return; }

    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) );

    this.nuevoFavorito.reset();
  }

  borrar( i: number ) {
    this.favoritosArr.removeAt(i)
  }

  guardar() {

    if( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.miFormulario.reset();
  }

}