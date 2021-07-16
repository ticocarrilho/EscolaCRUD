import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaFormModalComponent } from './sala-form-modal.component';

describe('AddSalaModalComponent', () => {
  let component: SalaFormModalComponent;
  let fixture: ComponentFixture<SalaFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
