import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaDetailsDialogComponent } from './cinema-details-dialog-component';

describe('CinemaDetailsDialogComponent', () => {
  let component: CinemaDetailsDialogComponent;
  let fixture: ComponentFixture<CinemaDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
