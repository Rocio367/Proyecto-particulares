import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { ForoComponent } from './pages/foro/foro.component';
import { TemasForoComponent } from './pages/temas-foro/temas-foro.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { ModalNuevoTemaComponent } from './components/modal-nuevo-tema/modal-nuevo-tema.component';
import { FiltrosTemaComponent } from './components/filtros-tema/filtros-tema.component';
import { ModalReporteComponent } from './components/modal-reporte/modal-reporte.component';



@NgModule({
  declarations:[ForoComponent, TemasForoComponent, FiltrosComponent, ModalNuevoTemaComponent, FiltrosTemaComponent, ModalReporteComponent],
  imports:[ CommonModule,SharedModule,RouterModule,AngularMaterialModule, ],
  exports:[],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ForoModule { }
