import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PremiumRequest } from './models/premium-request.model';
import { PremiumResponse } from './models/premium-response.model';


export const PREMIUM_API_URL = new InjectionToken<string>(
  'PREMIUM_API_URL',
  {
    providedIn: 'root',
    factory: () => 'https://localhost:7126/api/Premium/calculate'
  }
);

@Injectable({
  providedIn: 'root',
})
export class PremiumService {
   private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(PREMIUM_API_URL);

  calculatePremium(
    request: PremiumRequest
  ): Observable<PremiumResponse> {
    return this.http.post<PremiumResponse>(
      this.apiUrl,
      request
    );
  }
}
