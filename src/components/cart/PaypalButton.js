import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: "test",
  currency: "USD",
  intent: "capture"
};

function PaypalButton(){
 return (
   <PayPalScriptProvider options={initialOptions}>
     <PayPalButtons type="subscription" />
   </PayPalScriptProvider>
 );
}

export default PaypalButton;