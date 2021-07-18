import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { pairwise, startWith } from 'rxjs/operators';
import { Professor } from 'src/app/core/models/professor.type';
import { ProfessoresService } from 'src/app/professores/professores.service';
import { SalasService } from '../salas.service';

interface InjectedData {
  id?: number,
  edit: boolean
}

@Component({
  selector: 'app-sala-form-modal',
  templateUrl: './sala-form-modal.component.html',
  styleUrls: ['./sala-form-modal.component.scss']
})
export class SalaFormModalComponent implements OnInit {
  salaForm: FormGroup;
  loading = false;
  professores!: Professor[];

  constructor(public dialogRef: MatDialogRef<SalaFormModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: InjectedData,
    private fb: FormBuilder, private salasService: SalasService,
    private professoresService: ProfessoresService
  ) {
    if(this.data.edit) {
      this.salaForm = this.fb.group({
        nome_sala: ['', [Validators.required, Validators.maxLength(150)]],
        professores: [[]],
        professoresToRemove: [[]]
      });

      this.buildRemoveSubscription();
    } else {
      this.salaForm = this.fb.group({
        nome_sala: ['', [Validators.required, Validators.maxLength(150)]],
        professores: [[]]
      });
    }
  }

  ngOnInit(): void {
    this.requestProfessores();
    if(this.data.edit && this.data.id) {
      this.loading = true;
      this.salasService.getSala(this.data.id)
        .subscribe((data) => {
          data.professor?.forEach((e) => {
            let temp = this.salaForm.get('professores')?.value;
  
            if(temp) {
              temp.push(e.id);
            } else {
              temp = [e.id];
            }
  
            this.professores.push(e);
            this.salaForm.get('professores')?.setValue(temp);
          });
  
          this.salaForm.get('nome_sala')?.setValue(data.nome_sala);
        }, (err) => {
          this.dialogRef.close();
        }).add(() => this.loading = false);
    }
  }

  buildRemoveSubscription() {
    this.salaForm.get('professores')
      ?.valueChanges
      .pipe(startWith([]), pairwise())
      .subscribe(([prev, next]: [number[], number[]]) => {
        const toRemoveArray = this.salaForm.get('professoresToRemove')?.value;

        prev.forEach((id) => {
          if(!next.includes(id) && !toRemoveArray.includes(id)) {
            toRemoveArray.push(id);
          }
        });

        next.forEach((id) => {
          if(toRemoveArray.includes(id)) {
            const index = toRemoveArray.findIndex((idToRemove: number) => idToRemove === id);
            toRemoveArray.splice(index, 1);
          }
        });

        this.salaForm.get('professoresToRemove')?.setValue(toRemoveArray);
      });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  requestProfessores() {
    this.loading = true;
    this.professoresService.getProfessores()
      .subscribe((data: any) => { //!! TODO COLOCAR TYPE
        this.professores = data.filter((e: any) => e.sala === null);
      }, (err) => {
        this.dialogRef.close();
      }).add(() => this.loading = false);
  }

}
