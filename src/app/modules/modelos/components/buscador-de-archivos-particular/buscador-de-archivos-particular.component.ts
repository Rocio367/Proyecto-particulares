import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { ModelosService } from 'src/app/core/services/modelos/modelos.service';
import { Archivo } from 'src/app/shared/models/archivo';
import { Documento } from 'src/app/shared/models/documento';
import { FiltrosModelo } from 'src/app/shared/models/filtrosModelos';
import { Modelo } from 'src/app/shared/models/modelo';

@Component({
  selector: 'app-buscador-de-archivos-particular',
  templateUrl: './buscador-de-archivos-particular.component.html',
  styleUrls: ['./buscador-de-archivos-particular.component.scss']
})
export class BuscadorDeArchivosParticularComponent implements OnInit {


  archivos: Archivo[] = [];
  sortOptions: SelectItem[];

  sortOrder: number;
  sortKey = 'id';
  text: string;
  selectedEstado: string;
  estados = [{ name: 'Podés solicitarlo', code: '1' }, { name: 'Pendiente de respuesta', code: '2' }, { name: 'Resuelto', code: '3' }]

  selectedOrder = { name: 'Más recientes', code: 'Desc' };
  orden = [{ name: 'Más recientes', code: 'Desc' }, { name: 'Más antiguos', code: 'Asc' }]
  filtros = new FiltrosModelo;
  modelos: Modelo[] = [];

  idUser: string;

  constructor(private primengConfig: PrimeNGConfig, private router: Router, private servicioDeModelos: ModelosService) {
    this.idUser = localStorage.getItem('idUser');
    console.log(this.idUser)
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    this.obtenerDatos()
  }

  aplicar() {
    this.obtenerDatos()
  }

  limpiar() {
    this.text = null;
    this.selectedOrder = null;
    this.filtros.idUser = Number(this.idUser);
    this.obtenerDatos()
  }
  obtenerImagenEnBase64(documento: Documento): string {
    return `data:${documento.extension};base64,${documento.datos}`
  }


  obtenerDatos() {
    this.filtros.text = (this.text) ? this.text : '';
    this.filtros.orden = (this.selectedOrder) ? this.selectedOrder.code : '';
    this.filtros.idUser = Number(this.idUser);
    this.servicioDeModelos.buscarModelosParticular(this.filtros).subscribe((modelos) => {
      this.modelos = modelos;
      if (this.filtros.orden == 'Desc') {
        this.modelos.reverse();
      }
      this.modelos.forEach(modelo => {
        this.servicioDeModelos.obtenerArchivosPorModelo(modelo).subscribe(
          (documentos) => {
            modelo.archivos = documentos;
          },
          (error) => {
            console.error(error);
          }
        );
      });
    },
      (error) => {
        console.error(error);
      }
    )
  }
  verDetalle(l) {
    let id = l.id;
    this.router.navigate(['detalle-modelo-particular', { q: id }])
  }
}
