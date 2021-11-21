import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase/clase.service';
import { ParticularService } from 'src/app/core/services/particular/particular.service';
import { ReseniaService } from 'src/app/core/services/resenia/resenia.service';
import { DetalleClase } from 'src/app/shared/models/detalleClase';

@Component({
  selector: 'app-detalle-clase-particular',
  templateUrl: './detalle-clase-particular.component.html',
  styleUrls: ['./detalle-clase-particular.component.scss']
})
export class DetalleClaseParticularComponent implements OnInit {
  registro= new DetalleClase();
  alumnos = [];
  id:number;
  idUser=localStorage.getItem('idUser');
  opiniones: any;
  constructor(private reseniaService: ReseniaService,private aRouter:ActivatedRoute,private claseService:ClaseService,private particularServices:ParticularService) { 
    this.aRouter.params.subscribe(
      (params: Params) => {
        this.id=Number(params.q);
      }
    );
    this.claseService.compras(this.id).subscribe(res => {
       res.forEach(element => {
          if(element.usuario.rol=='alumno'){
            this.alumnos.push( { nombreCompleto: element.usuario.nombre+' '+element.usuario.apellido, fecha: new Date(element.fecha),estado:element.estado});
          }
       });
       console.log(this.alumnos)
    })
    this.claseService.verDetalle(this.id).subscribe(res => {
      console.log(res)
      this.registro.descripcion = res.descripcion;
      this.registro.titulo = res.nombre;
      this.registro.materia = res.materia;
      this.registro.stars = 5;
      this.registro.type = res.metodo;
      this.registro.nivel = res.nivel;
      this.registro.precio_por_hora=res.precio;
      this.registro.modo=res.modo;
    })

    this.particularServices.buscarPorIdProfesor(Number(this.idUser)).subscribe(res=>{
      console.log(res)
      this.registro.foto = res.usuario.fotoPerfil;
      this.registro.ubicacion = res.localidad;
      this.registro.particular = res.usuario.nombre +' ' + res.usuario.apellido;
     // this.registro.academico='Titulo academico ';
      this.registro.experiencia=res.experiencia;
      this.registro.telefono=res.usuario.telefono;
      this.registro.mail=res.usuario.email;
    })

    this.claseService.detalleClase(this.id).subscribe(res=>{
      console.log(res)
    })
    this.reseniaService.obtenerResenias(this.id).subscribe(res => {
      console.log(res)
      this.opiniones = res;
    })
  }

  ngOnInit(): void {
   
  }

}
