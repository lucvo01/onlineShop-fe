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
     <PayPalButtons createOrder={(data, action) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "13.99"
            }
          }
        ]
      })
     }}
     onApprove = {(data, action) => {
      return actions.order.capture().then(function (details) {
        alert(
          "Transaction Completed By" + details.payer.name.given_name
        )
      })
     }}
     />
   </PayPalScriptProvider>
 );
}

export default PaypalButton;