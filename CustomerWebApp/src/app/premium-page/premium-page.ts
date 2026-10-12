import { Component ,  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PremiumSdk,
  PremiumRequest,
  PremiumResponse
} from 'customer-sdk';

@Component({
  selector: 'app-premium-page',
  standalone: true,
  imports: [CommonModule, PremiumSdk],
  templateUrl: './premium-page.html',
  styleUrl: './premium-page.css'
})
export class PremiumPage implements OnInit , OnDestroy {
  showSdk = true;
  result?: PremiumResponse;

  request: PremiumRequest = {
    InwardDate: '2026-10-09 10:00:00',
    ApplicationNo: '',
    Source: 'BOI-LF',
    CustomerID: 'TEST-CUSTOMER',
    AddField: {
      Dummy: [
        { DummyName: '', DummyValue: '' },
        { DummyName: '', DummyValue: '' }
      ]
    },
    ApplicantDetails: {
      FirstName: 'Test',
      LastName: 'Customer',
      DateOfBirth: '04/04/1992',
      Gender: 'Male',
      Email: 'test@example.com',
      ContactNumber: '9999999999',
      City: 'Mumbai',
      State: 'Maharashtra'
    },
    ProposerDetails: {
      IsProposersameasApplicant: true,
      FirstName: 'Test',
      LastName: 'Customer',
      DateOfBirth: '04/04/1992',
      Gender: 'Male',
      Email: 'test@example.com',
      ContactNumber: '9999999999',
      City: 'Mumbai',
      State: 'Maharashtra'
    },
    ProductInfo: {
      ProductId: '1029',
      PolicyTerm: '240',
      PremiumPaymentTerm: '5 Pay',
      Modes: 'Semi-Annual',
      DistributionChannel: 'Corporate Agency',
      SubDistributionChannel: '',
      StandardAgeProof: 'Yes',
      Smoke: '',
      OptionLevel: '',
      Option: '',
      BenefitOption: '',
      PayoutOption: '',
      StaffPolicy: 'Corporate Agency Staff',
      StaffDiscount: '',
      PlanOption: '',
      KerelaFloodsCESSApplicable: 'No',
      SumAssured: '2500000'
    },
    IsRiderOpt: false,
    Riders: [{ ridername: '', ridervalue: '' }],
    FundStrategy: '',
    Funds: [{ fundname: '', fundvalue: '', fundpercentage: 0 }]
  };

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly allowedParentOrigin = 'http://localhost:4200';

  ngOnInit(): void {
     window.addEventListener('message', this.handleMessage);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.handleMessage);
  }
  onCompleted(response: PremiumResponse): void {

      // Send the premium result to ParentDemo
    window.parent.postMessage(
      {
        type: 'PREMIUM_COMPLETED',
        payload: response
      },
      'http://localhost:4200'
    );

    // Hide the SDK after returning the result
    this.showSdk = false;
  }


  private readonly handleMessage = (event: MessageEvent): void => {

    
  // Only accept messages from ParentDemo.
  if (event.origin !== this.allowedParentOrigin) {
    return;
  }

  debugger
  if (event.data?.type !== 'BASIC_INFORMATION') {
    return;
  }

  const info = event.data.payload;

  if (
    !info ||
    typeof info.firstName !== 'string' ||
    typeof info.lastName !== 'string' ||
    typeof info.customerId !== 'string'
  ) {
    return;
  }

  // Convert the HTML date (yyyy-MM-dd) into dd/MM/yyyy.
  const dateOfBirth = typeof info.dateOfBirth === 'string'
    ? info.dateOfBirth.split('-').reverse().join('/')
    : '';

  // Create a new request object so Angular detects the update.
  this.request = {
    ...this.request,
    CustomerID: info.customerId,

    ApplicantDetails: {
      ...this.request.ApplicantDetails,
      FirstName: info.firstName,
      LastName: info.lastName,
      DateOfBirth: dateOfBirth,
      Gender: info.gender,
      Email: info.email,
      ContactNumber: info.contactNumber
    },

    ProposerDetails: {
      ...this.request.ProposerDetails,
      FirstName: info.firstName,
      LastName: info.lastName,
      DateOfBirth: dateOfBirth,
      Gender: info.gender,
      Email: info.email,
      ContactNumber: info.contactNumber
    }
  };

  this.cdr.markForCheck();
};

  reopenSdk(): void {
    this.showSdk = true;
  }
}
