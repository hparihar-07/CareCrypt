import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThirdwebProvider } from 'thirdweb/react';
import { client, carecryptChain } from '../lib/thirdweb.js';
import { sepolia } from 'thirdweb/chains';

import { Toaster } from 'sonner';

import { RecordsProvider } from './pages/patient/RecordsContext.jsx';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThirdwebProvider client={client} chain={sepolia}>
      <>
      <RecordsProvider>
        <App />
        <Toaster />
      </RecordsProvider>
      </>
    </ThirdwebProvider>
  </StrictMode>,
);
