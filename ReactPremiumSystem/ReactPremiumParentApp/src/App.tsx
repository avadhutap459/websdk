import { useEffect, useRef, useState } from 'react';
import './App.css';

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

const SDK_ORIGIN = 'http://localhost:4300';

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [customer, setCustomer] = useState<BasicInformation>({
    customerId: 'CUST-1001',
    firstName: 'Avadhut',
    lastName: 'Parab',
    dateOfBirth: '1992-04-04',
    gender: 'Male',
    email: 'customer@example.com',
    contactNumber: '9999999999'
  });

  const [result, setResult] = useState<PremiumResult | null>(null);

  function updateField(
    field: keyof BasicInformation,
    value: string
  ) {
    setCustomer(previous => ({
      ...previous,
      [field]: value
    }));
  }

  function sendBasicInformation() {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'BASIC_INFORMATION',
        payload: customer
      },
      SDK_ORIGIN
    );
  }

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== SDK_ORIGIN) return;

      if (event.data?.type === 'PREMIUM_COMPLETED') {
        setResult(event.data.payload as PremiumResult);
      }
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <main className="parent">
      <h1>Customer Portal</h1>
      <p>React Parent Application</p>

      {!result && (
        <>
          <section className="panel">
            <h2>Customer Basic Information</h2>

            <div className="form-grid">
              <label>
                Customer ID
                <input
                  value={customer.customerId}
                  onChange={e =>
                    updateField('customerId', e.target.value)
                  }
                />
              </label>

              <label>
                First Name
                <input
                  value={customer.firstName}
                  onChange={e =>
                    updateField('firstName', e.target.value)
                  }
                />
              </label>

              <label>
                Last Name
                <input
                  value={customer.lastName}
                  onChange={e =>
                    updateField('lastName', e.target.value)
                  }
                />
              </label>

              <label>
                Date of Birth
                <input
                  type="date"
                  value={customer.dateOfBirth}
                  onChange={e =>
                    updateField('dateOfBirth', e.target.value)
                  }
                />
              </label>

              <label>
                Gender
                <select
                  value={customer.gender}
                  onChange={e =>
                    updateField('gender', e.target.value)
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={customer.email}
                  onChange={e =>
                    updateField('email', e.target.value)
                  }
                />
              </label>

              <label>
                Contact Number
                <input
                  value={customer.contactNumber}
                  onChange={e =>
                    updateField('contactNumber', e.target.value)
                  }
                />
              </label>
            </div>

            <button onClick={sendBasicInformation}>
              Send Information to SDK
            </button>
          </section>

          <section className="panel">
            <h2>Premium SDK</h2>

            <iframe
              ref={iframeRef}
              title="Premium SDK"
              src={`${SDK_ORIGIN}/`}
              onLoad={sendBasicInformation}
              width="100%"
              height="500"
            />
          </section>
        </>
      )}

      {result && (
        <section className="panel">
          <h2>Premium Summary</h2>

          <div className="summary-grid">
            <article>
              <span>Annual Premium</span>
              <strong>{result.annualPremium ?? '-'}</strong>
            </article>

            <article>
              <span>Installment Premium</span>
              <strong>{result.modalPremium ?? '-'}</strong>
            </article>

            <article>
              <span>Tax</span>
              <strong>{result.tax ?? '-'}</strong>
            </article>
          </div>

          {result.status && <p>Status: {result.status}</p>}
          {result.transactionId && (
            <p>Transaction ID: {result.transactionId}</p>
          )}

          <button onClick={() => setResult(null)}>
            Return to SDK
          </button>
        </section>
      )}
    </main>
  );
}
