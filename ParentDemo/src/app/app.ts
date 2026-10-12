import {
  Component,
  OnInit,
  OnDestroy,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BasicInformation {
  customerId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  contactNumber: string;
}

interface PremiumResult {
  status?: string;
  transactionId?: string;
  annualPremium?: number;
  modalPremium?: number;
  tax?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  readonly premiumResult = signal<PremiumResult | null>(null);

  readonly basicInfo: BasicInformation = {
    customerId: 'CUST-1001',
    firstName: 'Avadhut',
    lastName: 'Parab',
    dateOfBirth: '1992-04-04',
    gender: 'Male',
    email: 'customer@example.com',
    contactNumber: '9999999999'
  };

  private readonly sdkOrigin = 'http://localhost:4300';

  ngOnInit(): void {
    window.addEventListener('message', this.handleMessage);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.handleMessage);
  }

  sendBasicInformation(): void {
    const iframe = document.getElementById(
      'premiumFrame'
    ) as HTMLIFrameElement | null;

    if (!iframe?.contentWindow) {
      console.error('SDK iframe is not available.');
      return;
    }

    iframe.contentWindow.postMessage(
      {
        type: 'BASIC_INFORMATION',
        payload: this.basicInfo
      },
      this.sdkOrigin
    );
  }

  private readonly handleMessage = (event: MessageEvent): void => {
    if (event.origin !== this.sdkOrigin) {
      return;
    }

    if (event.data?.type === 'PREMIUM_COMPLETED') {
      this.premiumResult.set(event.data.payload);
    }
  };
}
