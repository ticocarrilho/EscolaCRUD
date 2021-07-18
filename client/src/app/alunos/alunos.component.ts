import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ActionEmitted } from '../core/models/actionEmitted.type';
import { Aluno } from '../core/models/aluno.type';
import { AlunoBody } from '../core/models/alunoBody.type';
import { TableColumns } from '../core/models/tableColumns.type';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';
import { AlunoFormModalComponent } from './aluno-form-modal/aluno-form-modal.component';
import { AlunoInfoModalComponent } from './aluno-info-modal/aluno-info-modal.component';
import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit, OnDestroy {
  alunos: Aluno[] = [];
  tableColumns: TableColumns = {
    columnsName: ['nome', 'formatted_professor', 'formatted_sala'],
    columnsText: ['Nome do Aluno', 'Professor','Sala']
  };
  tableActions = ['Visualizar Informações' ,'Editar Aluno', 'Deletar Aluno']

  currentPage = new BehaviorSubject<number>(0);
  totalCount = 0;
  loading = false;
  searchAluno = '';

  constructor(private alunosService: AlunosService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentPage
      .pipe(skip(1))
      .subscribe((page) => {
        this.requestAlunos();
      });

    this.requestAlunos();
  }

  ngOnDestroy() {
    this.currentPage.unsubscribe();
  }

  onSearchHandler(event: string) {
    this.searchAluno = event;
    this.currentPage.next(0);
  }

  onActionEmitHandler(event: ActionEmitted){
    if(event.action === 'Visualizar Informações') {
      this.openInfoDialog(event.id);
    } else if(event.action === 'Editar Aluno') {
      this.openEditDialog(event.id);
    } else if(event.action === 'Deletar Aluno') {
      this.openDeleteDialog(event.info.nome, event.id);
    }
  }

  openDeleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      panelClass: 'dialog-responsive',
      data: { text: `deletar o aluno ${name}?`  }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.deleteSala(id);
      }
    });
  }

  deleteSala(id: number) {
    this.loading = true;
    this.toastr.info('O aluno está sendo deletado.');

    this.alunosService.deleteAluno(id).subscribe(() => {
      this.toastr.success('O aluno foi deletado com sucesso.');
      this.currentPage.next(this.currentPage.getValue());
    });
  }

  requestAlunos() {
    this.loading = true;
    this.alunosService.getAlunos(this.searchAluno, `${this.currentPage.getValue()}`)
      .subscribe((data) => {
        this.alunos = data.alunos.map((aluno) => {
          const formatted_professor = aluno.professor ? aluno.professor.nome : 'Não possui um Professor';
          const formatted_sala = (aluno.professor && aluno.professor.sala) ? aluno.professor.sala.nome_sala : 'Não possui uma Sala';
          
          return {
            ...aluno,
            formatted_sala,
            formatted_professor
          }
        });
        this.totalCount = data.totalCount;
      }).add(() => this.loading = false);
  }

  openInfoDialog(id: number) {
    const dialogRef = this.dialog.open(AlunoInfoModalComponent, {
      panelClass: 'dialog-responsive',
      data: { id }
    });

    dialogRef.afterClosed().subscribe((action: ActionEmitted) => {
      if(action) {
        this.onActionEmitHandler(action);
      }
    });
  }

  openEditDialog(id: number) {
    const dialogRef = this.dialog.open(AlunoFormModalComponent, {
      panelClass: 'dialog-responsive',
      data: { id, edit: true }
    });

    dialogRef.afterClosed().subscribe((aluno: AlunoBody) => {
      if(aluno) {
        this.loading = true;
        this.toastr.info('O aluno está sendo editado.');

        this.alunosService.patchAluno(id, aluno).subscribe((data) => {
          this.toastr.success('O aluno foi editado com sucesso.');
          this.currentPage.next(this.currentPage.getValue());
        });
      }
    });
  }

  customStyleHandler(element: Aluno, column: string) {
    const stylesObj = {
      'font-weight': '600',
      'color': 'red'
    }

    if(column === 'nome' && !element.professor) {
      return stylesObj;
    }

    return null;
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AlunoFormModalComponent, {
      panelClass: 'dialog-responsive',
      data: { edit: false }
    });

    dialogRef.afterClosed().subscribe((aluno: AlunoBody) => {
      if(aluno) {
        this.loading = true;
        this.toastr.info('O aluno está sendo criada.');
  
        this.alunosService.postAluno(aluno).subscribe((data) => {
          this.toastr.success('O aluno foi criada com sucesso.');
          this.currentPage.next(this.currentPage.getValue());
        });
      }
    });
  }

}
