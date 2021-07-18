import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sala } from 'src/app/core/models/sala.type';
import { SalasService } from 'src/app/salas/salas.service';
import { ProfessoresService } from '../professores.service';

interface InjectedData {
  id?: number,
  edit: boolean
}

@Component({
  selector: 'app-professor-form-modal',
  templateUrl: './professor-form-modal.component.html',
  styleUrls: ['./professor-form-modal.component.scss']
})
export class ProfessorFormModalComponent implements OnInit {
  professorForm: FormGroup;
  loading = false;
  salas!: Sala[];

  constructor(public dialogRef: MatDialogRef<ProfessorFormModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: InjectedData,
    private fb: FormBuilder, private salasService: SalasService,
    private professoresService: ProfessoresService
  ) {

    this.professorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      sala: ''
    });
  }

  ngOnInit(): void {
    this.requestSalas();
    if(this.data.edit && this.data.id) {
      this.loading = true;
      this.professoresService.getProfessor(this.data.id)
        .subscribe((data) => {
          this.professorForm.get('nome')?.setValue(data.nome);
          
          if(this.data.edit && data.sala) {
            this.professorForm.get('sala')?.setValue(data.sala.id);
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
    this.salasService.getSalas()
      .subscribe((data) => {
        this.salas = data.salas
      }, (err) => {
        this.dialogRef.close();
      }).add(() => this.loading = false);
  }

}
