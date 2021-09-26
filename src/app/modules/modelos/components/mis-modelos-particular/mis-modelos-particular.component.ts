import {A, COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Archivo } from 'src/app/shared/models/archivo';

@Component({
  selector: 'app-mis-modelos-particular',
  templateUrl: './mis-modelos-particular.component.html',
  styleUrls: ['./mis-modelos-particular.component.scss']
})
export class MisModelosParticularComponent implements OnInit {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  classCtrl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = [];
  allOptions: string[] = [];
  allComplete: boolean = false;
  archivos: Archivo[]=[];
  filters:any[]=[{nombre:'Pendiente de respuesta'},{nombre:'Resueltos por mi'},{nombre:'Ultimas agregados'},]
  @ViewChild('classInput') classInput: ElementRef<HTMLInputElement>;

  constructor(private router:Router) {
  
    let a2=new Archivo();
    a2.archivos=['default-placeholder.png']
    a2.nombre='nombre 2'
    a2.fecha=new Date;
    a2.seguidores=9;
    a2.profesores=['particular 1']
    a2.estado='Pendiente de respuesta'
    a2.carrera = 'carrera '
    a2.institucion = 'institucion '
    a2.materia = 'materia '
    a2.nivel = 'nivel '

    let a3=new Archivo();
    a3.archivos=['default-placeholder.png']
    a3.nombre='nombre 2'
    a3.fecha=new Date;
    a3.seguidores=9;
    a3.profesores=['particular 1']
    a3.estado='Resuelto por mi'
    a3.carrera = 'carrera '
    a3.institucion = 'institucion '
    a3.materia = 'materia '
    a3.nivel = 'nivel '
    this.archivos.push(a2,a3)
    this.filteredOptions = this.classCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allOptions.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.options.push(value);
    }

    // Clear the input value
    event.value=null;

    this.classCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.options.indexOf(fruit);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.options.push(event.option.viewValue);
    this.classInput.nativeElement.value = '';
    this.classCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allOptions.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  ngOnInit(): void {
  }

  buscar(){
   // this.router.navigate(['busqueda/'+ this.options])
  }
  setAll(completed: boolean) {
  }

  like(t:Archivo){
     
    this.archivos[ this.archivos.indexOf(t)].seguidores++;
    this.archivos[ this.archivos.indexOf(t)].like=!this.archivos[ this.archivos.indexOf(t)].like;
 }

 verDetalle(a : Archivo){
   this.router.navigate(['detalle-modelo-alumno/id'])
 }
}