import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspAdminComponent } from './asp-admin-component';

describe('AspAdminComponent', () => {
  let component: AspAdminComponent;
  let fixture: ComponentFixture<AspAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AspAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AspAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
