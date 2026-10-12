import { useEffect, useState } from 'react';
import PremiumCalculator, {
  type BasicInformation
} from './PremiumCalculator';
import './App.css';

interface PremiumResult {
  status?: string;
  transactionId?: string;
  annualPremium?: number;
  modalPremium?: number;
  tax?: number;
}

const PARENT_ORIGIN = 'http://localhost:5174';

const defaultCustomer: BasicInformation = {
  customerId: 'CUST-1001',
  firstName: 'Test',
  lastName: 'Customer',
  dateOfBirth: '1992-04-04',
  gender: 'Male',
  email: 'customer@example.com',
  contactNumber: '9999999999'
};

export default function App() {
  const [customer, setCustomer] =
    useState<BasicInformation>(defaultCustomer);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== PARENT_ORIGIN) return;

      if (event.data?.type === 'BASIC_INFORMATION') {
        const info = event.data.payload;

        if (
          !info ||
          typeof info.customerId !== 'string' ||
          typeof info.firstName !== 'string' ||
          typeof info.lastName !== 'string'
        ) {
          return;
        }

        setCustomer(info as BasicInformation);
      }
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  function handleCompleted(result: PremiumResult) {
    window.parent.postMessage(
      {
        type: 'PREMIUM_COMPLETED',
        payload: result
      },
      PARENT_ORIGIN
    );
  }

  return (
    <main className="webapp">
      <h1>Premium SDK Web App</h1>

      <PremiumCalculator
        customer={customer}
        onCompleted={handleCompleted}
      />
    </main>
  );
}
