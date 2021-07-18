import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoInfoModalComponent } from './aluno-info-modal.component';

describe('AlunoInfoModalComponent', () => {
  let component: AlunoInfoModalComponent;
  let fixture: ComponentFixture<AlunoInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunoInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
