import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartNavComponent } from './cart-nav.component';

describe('CartNavComponent', () => {
  let component: CartNavComponent;
  let fixture: ComponentFixture<CartNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartNavComponent]
    });
    fixture = TestBed.createComponent(CartNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
