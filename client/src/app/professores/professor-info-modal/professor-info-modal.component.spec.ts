import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorInfoModalComponent } from './professor-info-modal.component';

describe('ProfessorInfoModalComponent', () => {
  let component: ProfessorInfoModalComponent;
  let fixture: ComponentFixture<ProfessorInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
