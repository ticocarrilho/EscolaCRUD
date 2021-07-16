import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaInfoModalComponent } from './sala-info-modal.component';

describe('SalaInfoModalComponent', () => {
  let component: SalaInfoModalComponent;
  let fixture: ComponentFixture<SalaInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
