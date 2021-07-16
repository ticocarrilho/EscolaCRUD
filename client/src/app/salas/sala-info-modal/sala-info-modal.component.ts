import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionEmitted } from 'src/app/core/models/actionEmitted.type';
import { Sala } from 'src/app/core/models/sala.type';
import { SalasService } from '../salas.service';

interface InjectedData {
  id: number
}

@Component({
  selector: 'app-sala-info-modal',
  templateUrl: './sala-info-modal.component.html',
  styleUrls: ['./sala-info-modal.component.scss']
})
export class SalaInfoModalComponent implements OnInit {
  sala!: Sala;
  loading = false;

  constructor(public dialogRef: MatDialogRef<SalaInfoModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: InjectedData,
    private salasService: SalasService) { }

  ngOnInit(): void {
    this.requestSala();
  }

  requestSala() {
    this.loading = true;
    this.salasService.getSala(this.data.id)
      .subscribe((data) => {
        this.sala = data;
      }, (err) => {
        this.dialogRef.close();
      }).add(() => this.loading = false);
  }

  getActionBody(action: string): ActionEmitted {
    const { professor, ...sala } = this.sala;
    return {
      id: sala.id,
      action,
      info: sala
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
