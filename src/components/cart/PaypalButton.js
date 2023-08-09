import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";

const initialOptions = {
  clientId:
    "AWsb3366j3tNKfYdGWCag3PEhq9Og8p4HQklEeP0n4Fe8IYFtIBdSV9RJNgixgzHT29FOUBTEEdPs_o7",
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
