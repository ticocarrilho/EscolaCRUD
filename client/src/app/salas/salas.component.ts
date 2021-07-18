import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ActionEmitted } from '../core/models/actionEmitted.type';
import { Sala } from '../core/models/sala.type';
import { SalaBody } from '../core/models/salaBody.type';
import { TableColumns } from '../core/models/tableColumns.type';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';
import { SalaFormModalComponent } from './sala-form-modal/sala-form-modal.component';
import { SalaInfoModalComponent } from './sala-info-modal/sala-info-modal.component';
import { SalasService } from './salas.service';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.scss']
})
export class SalasComponent implements OnInit, OnDestroy {
  salas: Sala[] = [];
  tableColumns: TableColumns = {
    columnsName: ['nome_sala'],
    columnsText: ['Nome da Sala']
  };
  tableActions = ['Visualizar Informações' ,'Editar Sala', 'Deletar Sala']

  currentPage = new BehaviorSubject<number>(0);
  totalCount = 0;
  loading = false;
  searchSala = '';

  constructor(private salasService: SalasService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentPage
      .pipe(skip(1))
      .subscribe((page) => {
        this.requestSalas();
      });

    this.requestSalas();
  }

  ngOnDestroy() {
    this.currentPage.unsubscribe();
  }

  onSearchHandler(event: string) {
    this.searchSala = event;
    this.currentPage.next(0);
  }

  onActionEmitHandler(event: ActionEmitted){
    if(event.action === 'Visualizar Informações') {
      this.openInfoDialog(event.id);
    } else if(event.action === 'Editar Sala') {
      this.openEditDialog(event.id);
    } else if(event.action === 'Deletar Sala') {
      this.openDeleteDialog(event.info.nome_sala, event.id);
    }
  }

  openDeleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      panelClass: 'dialog-responsive',
      data: { text: `deletar a sala ${name}?`  }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.deleteSala(id);
      }
    });
  }

  deleteSala(id: number) {
    this.loading = true;
    this.toastr.info('A sala está sendo deletada.');

    this.salasService.deleteSala(id).subscribe(() => {
      this.toastr.success('A sala foi deletada com sucesso.');
      this.currentPage.next(this.currentPage.getValue());
    });
  }

  requestSalas() {
    this.loading = true;
    this.salasService.getSalas(this.searchSala, `${this.currentPage.getValue()}`)
      .subscribe((data) => {
        this.salas = data.salas;
        this.totalCount = data.totalCount;
      }).add(() => this.loading = false);
  }

  openInfoDialog(id: number) {
    const dialogRef = this.dialog.open(SalaInfoModalComponent, {
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
    const dialogRef = this.dialog.open(SalaFormModalComponent, {
      panelClass: 'dialog-responsive',
      data: { id, edit: true }
    });

    dialogRef.afterClosed().subscribe((sala: SalaBody) => {
      if(sala) {
        this.loading = true;
        this.toastr.info('A sala está sendo editada.');

        this.salasService.patchSala(id, sala).subscribe((data) => {
          this.toastr.success('A sala foi editada com sucesso.');
          this.currentPage.next(this.currentPage.getValue());
        });
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(SalaFormModalComponent, {
      panelClass: 'dialog-responsive',
      data: { edit: false }
    });

    dialogRef.afterClosed().subscribe((sala: SalaBody) => {
      if(sala) {
        this.loading = true;
        this.toastr.info('A sala está sendo criada.');
  
        this.salasService.postSala(sala).subscribe((data) => {
          this.toastr.success('A sala foi criada com sucesso.');
          this.currentPage.next(this.currentPage.getValue());
        });
      }
    });
  }

}
