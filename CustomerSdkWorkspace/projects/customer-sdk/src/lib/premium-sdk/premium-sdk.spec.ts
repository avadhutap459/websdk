import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumSdk } from './premium-sdk';

describe('PremiumSdk', () => {
  let component: PremiumSdk;
  let fixture: ComponentFixture<PremiumSdk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumSdk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumSdk);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
