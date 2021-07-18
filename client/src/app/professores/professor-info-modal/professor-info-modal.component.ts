import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionEmitted } from 'src/app/core/models/actionEmitted.type';
import { Professor } from 'src/app/core/models/professor.type';
import { ProfessoresService } from '../professores.service';

interface InjectedData {
  id: number
}

@Component({
  selector: 'app-professor-info-modal',
  templateUrl: './professor-info-modal.component.html',
  styleUrls: ['./professor-info-modal.component.scss']
})
export class ProfessorInfoModalComponent implements OnInit {
  professor!: Professor;
  loading = false;

  constructor(public dialogRef: MatDialogRef<ProfessorInfoModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: InjectedData,
    private professorService: ProfessoresService) { }

  ngOnInit(): void {
    this.requestSala();
  }

  requestSala() {
    this.loading = true;
    this.professorService.getProfessor(this.data.id)
      .subscribe((data) => {
        this.professor = data;
      }, (err) => {
        this.dialogRef.close();
      }).add(() => this.loading = false);
  }

  getActionBody(action: string): ActionEmitted {
    const { sala, ...professor } = this.professor;
    return {
      id: professor.id,
      action,
      info: professor
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
