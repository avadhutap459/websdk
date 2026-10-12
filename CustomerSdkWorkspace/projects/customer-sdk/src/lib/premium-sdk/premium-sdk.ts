import {
  Component,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';

import {
  CommonModule,
  DecimalPipe
} from '@angular/common';

import { PremiumService } from '../premium-service';
import { PremiumRequest } from '../models/premium-request.model';
import { PremiumResponse } from '../models/premium-response.model';

@Component({
  selector: 'lib-premium-sdk',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './premium-sdk.html',
  styleUrl: './premium-sdk.css',
})
export class PremiumSdk {
  @Input({ required: true }) request!: PremiumRequest;

  @Output() completed = new EventEmitter<PremiumResponse>();

  private readonly premiumService = inject(PremiumService);
  private readonly cdr = inject(ChangeDetectorRef);

  currentStep = 1;
  loading = false;
  errorMessage = '';
  premiumResponse?: PremiumResponse;

  next(): void {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  back(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  viewSummary(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.premiumResponse = undefined;

    this.cdr.markForCheck();

    this.premiumService.calculatePremium(this.request).subscribe({
      next: (response: PremiumResponse) => {
        console.log('Premium API response:', response);

        this.premiumResponse = response;
        this.currentStep = 3;
        this.loading = false;

        // Notify Angular to refresh the view.
        this.cdr.markForCheck();
      },

      error: (error: unknown) => {
        console.error('Premium calculation failed:', error);

        this.errorMessage =
          'Unable to calculate premium. Please try again.';

        this.loading = false;

        // Refresh the view to display the error.
        this.cdr.markForCheck();
      }
    });
  }

  returnToWebApp(): void {
    if (this.premiumResponse) {
      this.completed.emit(this.premiumResponse);
    }
  }
}
