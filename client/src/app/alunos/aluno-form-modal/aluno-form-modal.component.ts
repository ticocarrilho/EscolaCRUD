import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Professor } from 'src/app/core/models/professor.type';
import { ProfessoresService } from 'src/app/professores/professores.service';
import { AlunosService } from '../alunos.service';

interface InjectedData {
  id?: number,
  edit: boolean
}

@Component({
  selector: 'app-aluno-form-modal',
  templateUrl: './aluno-form-modal.component.html',
  styleUrls: ['./aluno-form-modal.component.scss']
})
export class AlunoFormModalComponent implements OnInit {
  alunoForm: FormGroup;
  loading = false;
  professores!: Professor[];

  constructor(public dialogRef: MatDialogRef<AlunoFormModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: InjectedData,
    private fb: FormBuilder, private professoresService: ProfessoresService,
    private alunoService: AlunosService
  ) {

    this.alunoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      professor: ''
    });
  }

  ngOnInit(): void {
    this.requestSalas();
    if(this.data.edit && this.data.id) {
      this.loading = true;
      this.alunoService.getAluno(this.data.id)
        .subscribe((data) => {
          this.alunoForm.get('nome')?.setValue(data.nome);
          
          if(this.data.edit && data.professor) {
            this.alunoForm.get('professor')?.setValue(data.professor.id);
          }      
        }, (err) => {
          this.dialogRef.close();
        }).add(() => this.loading = false);
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  requestSalas() {
    this.loading = true;
    this.professoresService.getProfessores()
      .subscribe((data) => {
        this.professores = data.professores
      }, (err) => {
        this.dialogRef.close();
      }).add(() => this.loading = false);
  }

}
