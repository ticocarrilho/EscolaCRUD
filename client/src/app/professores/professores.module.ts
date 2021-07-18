import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessoresComponent } from './professores.component';
import { routing } from './professores.routing';
import { SharedModule } from '../shared/shared.module';
import { ProfessorFormModalComponent } from './professor-form-modal/professor-form-modal.component';
import { ProfessorInfoModalComponent } from './professor-info-modal/professor-info-modal.component';

@NgModule({
  declarations: [
    ProfessoresComponent,
    ProfessorFormModalComponent,
    ProfessorInfoModalComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
  ]
})
export class ProfessoresModule { }
