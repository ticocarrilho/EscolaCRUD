import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorFormModalComponent } from './professor-form-modal.component';

describe('ProfessorFormModalComponent', () => {
  let component: ProfessorFormModalComponent;
  let fixture: ComponentFixture<ProfessorFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
