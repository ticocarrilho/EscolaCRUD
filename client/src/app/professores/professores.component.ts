import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ActionEmitted } from '../core/models/actionEmitted.type';
import { Professor } from '../core/models/professor.type';
import { ProfessorBody } from '../core/models/professorBody.type';
import { TableColumns } from '../core/models/tableColumns.type';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';
import { ProfessorFormModalComponent } from './professor-form-modal/professor-form-modal.component';
import { ProfessorInfoModalComponent } from './professor-info-modal/professor-info-modal.component';
import { ProfessoresService } from './professores.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.scss']
})
export class ProfessoresComponent implements OnInit, OnDestroy {
  professores: Professor[] = [];
  tableColumns: TableColumns = {
    columnsName: ['nome', 'formatted_sala'],
    columnsText: ['Nome do Professor', 'Sala']
  };
  tableActions = ['Visualizar Informações' ,'Editar Professor', 'Deletar Professor']

  currentPage = new BehaviorSubject<number>(0);
  totalCount = 0;
  loading = false;
  searchProfessor = '';

  constructor(private professoresService: ProfessoresService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentPage
      .pipe(skip(1))
      .subscribe((page) => {
        this.requestProfessores();
      });

    this.requestProfessores();
  }

  ngOnDestroy() {
    this.currentPage.unsubscribe();
  }

  onSearchHandler(event: string) {
    this.searchProfessor = event;
    this.currentPage.next(0);
  }

  onActionEmitHandler(event: ActionEmitted){
    if(event.action === 'Visualizar Informações') {
      this.openInfoDialog(event.id);
    } else if(event.action === 'Editar Professor') {
      this.openEditDialog(event.id);
    } else if(event.action === 'Deletar Professor') {
      this.openDeleteDialog(event.info.nome, event.id);
    }
  }

  openDeleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      panelClass: 'dialog-responsive',
      data: { text: `deletar o professor ${name}?`  }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.deleteSala(id);
      }
    });
  }

  deleteSala(id: number) {
    this.loading = true;
    this.toastr.info('O professor está sendo deletado.');

    this.professoresService.deleteProfessor(id).subscribe(() => {
      this.toastr.success('O professor foi deletado com sucesso.');
      this.currentPage.next(this.currentPage.getValue());
    });
  }

  requestProfessores() {
    this.loading = true;
    this.professoresService.getProfessores(this.searchProfessor, `${this.currentPage.getValue()}`)
      .subscribe((data) => {
        this.professores = data.professores.map((professor) => {
          const formatted_sala = professor.sala ? professor.sala.nome_sala : 'Não possui uma sala';
          return {
            ...professor,
            formatted_sala
          }
        });
        this.totalCount = data.totalCount;
      }).add(() => this.loading = false);
  }

  openInfoDialog(id: number) {
    const dialogRef = this.dialog.open(ProfessorInfoModalComponent, {
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
    const dialogRef = this.dialog.open(ProfessorFormModalComponent, {
      panelClass: 'dialog-responsive',
      data: { id, edit: true }
    });

    dialogRef.afterClosed().subscribe((professor: ProfessorBody) => {
      if(professor) {
        this.loading = true;
        this.toastr.info('O professor está sendo editado.');

        this.professoresService.patchProfessor(id, professor).subscribe((data) => {
          this.toastr.success('O professor foi editado com sucesso.');
          this.currentPage.next(this.currentPage.getValue());
        });
      }
    });
  }

  customStyleHandler(element: Professor, column: string) {
    const stylesObj = {
      'font-weight': '600',
      'color': 'blue'
    }

    if(column === 'nome' && !element.sala) {
      return stylesObj;
    }

    return null;
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(ProfessorFormModalComponent, {
      panelClass: 'dialog-responsive',
      data: { edit: false }
    });

    dialogRef.afterClosed().subscribe((professor: ProfessorBody) => {
      if(professor) {
        this.loading = true;
        this.toastr.info('O professor está sendo criada.');
  
        this.professoresService.postProfessor(professor).subscribe((data) => {
          this.toastr.success('O professor foi criada com sucesso.');
          this.currentPage.next(this.currentPage.getValue());
        });
      }
    });
  }

}
