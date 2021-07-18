import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionEmitted } from 'src/app/core/models/actionEmitted.type';
import { Aluno } from 'src/app/core/models/aluno.type';
import { AlunosService } from '../alunos.service';

interface InjectedData {
  id: number
}

@Component({
  selector: 'app-aluno-info-modal',
  templateUrl: './aluno-info-modal.component.html',
  styleUrls: ['./aluno-info-modal.component.scss']
})
export class AlunoInfoModalComponent implements OnInit {
  aluno!: Aluno;
  loading = false;

  constructor(public dialogRef: MatDialogRef<AlunoInfoModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: InjectedData,
    private alunoService: AlunosService) { }

  ngOnInit(): void {
    this.requestSala();
  }

  requestSala() {
    this.loading = true;
    this.alunoService.getAluno(this.data.id)
      .subscribe((data) => {
        this.aluno = data;
      }, (err) => {
        this.dialogRef.close();
      }).add(() => this.loading = false);
  }

  getActionBody(action: string): ActionEmitted {
    const { professor, ...aluno } = this.aluno;
    return {
      id: aluno.id,
      action,
      info: aluno
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
