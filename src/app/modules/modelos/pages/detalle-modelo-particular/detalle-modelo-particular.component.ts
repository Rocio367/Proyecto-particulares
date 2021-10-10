import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Archivo } from 'src/app/shared/models/archivo';
import { imgGallery } from 'src/app/shared/models/imgGallery';
import Swal from 'sweetalert2';
import { ModalPostulacionModelosComponent } from '../../components/modal-postulacion-modelos/modal-postulacion-modelos.component';

@Component({
  selector: 'app-detalle-modelo-particular',
  templateUrl: './detalle-modelo-particular.component.html',
  styleUrls: ['./detalle-modelo-particular.component.scss']
})
export class DetalleModeloParticularComponent implements OnInit {
  gallery: imgGallery[] = [];
  resoluciones: string[] = ['default-placeholder.png'];
  archivo = new Archivo;
  public progress: number;
  archivoForm: FormGroup;
  dataimage: any;
  id:number ;
  alumno={nombreCompleto:'Agustin Rios',edad:16}
  @ViewChild('fileInput') fileInput: ElementRef;
  files = '';
  message=false;
  formComentario: FormGroup;

  constructor(public dialog: MatDialog,private form: FormBuilder,public snackBar: MatSnackBar,private router: ActivatedRoute) {
      this.router
        .params
        .subscribe(params => {
  
          this.id = params.q;
        });
    
    this.formComentario = this.form.group({
      comentario: [''],
    });

    this.id=this.router.snapshot.params['id'];
    this.archivo.archivos = ['default-placeholder.png']
    this.archivo.nombre = 'nombre '
    this.archivo.carrera = 'carrera '
    this.archivo.institucion = 'institucion '
    this.archivo.materia = 'materia '
    this.archivo.nivel = 'nivel '
    this.archivo.fecha = new Date;
    this.archivo.seguidores = 4;
    this.archivo.estado = 'Pendiente'

    var i = 0;

    let img = new imgGallery();
    img.id = i.toString();
    img.path = 'default-placeholder.png';
    img.position = i;
    i++;
    this.gallery.push(img)

    let img2 = new imgGallery();
    img2.id = i.toString();
    img2.path = 'default-placeholder.png';
    img2.position = i;
    i++;
    this.gallery.push(img2)

    let img3 = new imgGallery();
    img3.id = i.toString();
    img3.path = 'default-placeholder.png';
    img3.position = i;
    i++;
    this.gallery.push(img3)

    let img4 = new imgGallery();
    img4.id = i.toString();
    img4.path = 'default-placeholder.png';
    img4.position = i;
    i++;
    this.gallery.push(img4)
  }

  ngOnInit(): void {
    if(this.id==1 || this.id == 2 || this.id==3){
      this.archivo.estado='resolver';
    }else 
    if(this.id==4 ){
      this.archivo.estado='pendiente';
    } else 
    if(this.id==5 ){
      this.archivo.estado='resuelto';
    }
  }
  open(n: number) {
    window.open('./assets/img/' + this.gallery[n].path)
  }
  openRes(n: string) {
    window.open('./assets/img/' + n)
  }
  contratar() {

  }
  postularme(){
    this.dialog.open(ModalPostulacionModelosComponent, { panelClass: 'custom-dialog-container'});
  }
  uploadFile = (files) => {
    this.files = files;
    console.log(files)
    if (files.length === 0) {
      this.message = false;
      this.openSnackBar('Debe cargar almenos un archivo', 'x')
    } else {
      let fileToUpload = <File>files[0];
      this.message = true;
      this.openSnackBar('Archivo cargado', 'x')

    }


  }

  confirmar() {
    Swal.fire(
      'El archivo fue subido correctamente',
      '',
      'success'
    )
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['red-snackbar'],
    });
  }

  enviar(){
    Swal.fire(
      'La resolucion fue enviada con exito',
      '',
      'success'
    )
  }
}
