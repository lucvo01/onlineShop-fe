import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {useSelector } from "react-redux";

const initialOptions = {
  clientId: "test",
  currency: "USD",
  intent: "capture"
};

function PaypalButton() {
  const { subtotal } = useSelector((state) => state.cart);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${subtotal}`
                }
              }
            ]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function (details) {
            alert("Transaction Completed By" + details.payer.name.given_name);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;
