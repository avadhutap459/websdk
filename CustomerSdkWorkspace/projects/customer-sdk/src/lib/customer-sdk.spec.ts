import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSdk } from './customer-sdk';

describe('CustomerSdk', () => {
  let component: CustomerSdk;
  let fixture: ComponentFixture<CustomerSdk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSdk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSdk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
