import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoanhthuComponent } from './admin-doanhthu.component';

describe('AdminDoanhthuComponent', () => {
  let component: AdminDoanhthuComponent;
  let fixture: ComponentFixture<AdminDoanhthuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDoanhthuComponent]
    });
    fixture = TestBed.createComponent(AdminDoanhthuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
