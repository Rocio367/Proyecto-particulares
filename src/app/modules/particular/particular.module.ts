import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { ComentariosParticularComponent } from './pages/comentarios-particular/comentarios-particular.component';
import { EditarPerfilParticularComponent } from './pages/editar-perfil-particular/editar-perfil-particular.component';
import { PerfilParticularComponent } from './pages/perfil-particular/perfil-particular.component';
import { RegistrarParticularComponent } from './pages/registrar-particular/registrar-particular.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';




@NgModule({
  declarations:[ RegistrarParticularComponent, PerfilParticularComponent, EditarPerfilParticularComponent, ComentariosParticularComponent],
  imports:[ CommonModule,SharedModule,RouterModule,AngularMaterialModule, NgxMatFileInputModule,CalendarModule, 
    InputTextModule, InputTextareaModule, CardModule, ButtonModule, DividerModule,],
  exports:[],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ParticularModule { }
