import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalasComponent } from './salas.component';
import { routing } from './salas.routing';
import { SharedModule } from '../shared/shared.module';
import { SalaFormModalComponent } from './sala-form-modal/sala-form-modal.component';
import { SalaInfoModalComponent } from './sala-info-modal/sala-info-modal.component';

@NgModule({
  declarations: [
    SalasComponent,
    SalaFormModalComponent,
    SalaInfoModalComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
  ]
})
export class SalasModule { }
