import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumPage } from './premium-page';

describe('PremiumPage', () => {
  let component: PremiumPage;
  let fixture: ComponentFixture<PremiumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
