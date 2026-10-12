import { useState } from 'react';

export interface BasicInformation {
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

interface PremiumCalculatorProps {
  customer: BasicInformation;
  onCompleted: (result: PremiumResult) => void;
}

export default function PremiumCalculator({
  customer,
  onCompleted
}: PremiumCalculatorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function calculatePremium() {
    setLoading(true);
    setError('');

    try {
      // Replace this example with your complete API request model.
      const request = {
        CustomerID: customer.customerId,
        ApplicantDetails: {
          FirstName: customer.firstName,
          LastName: customer.lastName,
          DateOfBirth: customer.dateOfBirth,
          Gender: customer.gender,
          Email: customer.email,
          ContactNumber: customer.contactNumber
        }
      };

      const response = await fetch(
        'https://localhost:7126/api/Premium/calculate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        }
      );

      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }

      const result = await response.json() as PremiumResult;
      onCompleted(result);
    } catch (err) {
      console.error(err);
      setError(
        'Unable to calculate premium. Check the API URL, request model and browser console.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="sdk-card">
      <h2>Premium Calculator</h2>

      <h3>Basic Information</h3>

      <p>
        Customer: {customer.firstName} {customer.lastName}
      </p>
      <p>Customer ID: {customer.customerId}</p>
      <p>Email: {customer.email}</p>
      <p>Contact: {customer.contactNumber}</p>

      <button
        type="button"
        onClick={calculatePremium}
        disabled={loading}
      >
        {loading ? 'Calculating...' : 'Calculate Premium'}
      </button>

      {error && <p className="error">{error}</p>}
    </section>
  );
}
