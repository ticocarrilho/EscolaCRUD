import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunosComponent } from './alunos.component';
import { routing } from './alunos.routing';
import { SharedModule } from '../shared/shared.module';
import { AlunoFormModalComponent } from './aluno-form-modal/aluno-form-modal.component';
import { AlunoInfoModalComponent } from './aluno-info-modal/aluno-info-modal.component';

@NgModule({
  declarations: [
    AlunosComponent,
    AlunoFormModalComponent,
    AlunoInfoModalComponent
  ],
  imports: [
    CommonModule,
    routing,
    SharedModule,
  ]
})
export class AlunosModule { }
