import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ✅ Import React Query
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// ✅ Query Client yaratish
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
