import { PaymentDetailsProvider } from "./context/PaymentDetailsProvider";
import { LoadingProvider } from "./context/LoadingProvider";
import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserProvider } from "./context/UserProvider";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <LoadingProvider>
        <PaymentDetailsProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </PaymentDetailsProvider>
    </LoadingProvider>
</BrowserRouter>,
);


