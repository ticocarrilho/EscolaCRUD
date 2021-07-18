import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoFormModalComponent } from './aluno-form-modal.component';

describe('AlunoFormModalComponent', () => {
  let component: AlunoFormModalComponent;
  let fixture: ComponentFixture<AlunoFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
