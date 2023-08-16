import React ,{useEffect, useRef} from "react";
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

  const paypal = useRef()

  useEffect(() => {
window.paypal.Buttons({
    createOrder: (data, actions, err) => {
      return actions.order.create({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: "a t-shirt",
            amount: {
              currency_code: "USD",
              value: 650.00
            }
          }
        ]
      })
    },
    onApprove: async (data, actions) => {
      const order = await (actions.order.capture)
      console.log( order)
    },
    onError: (err) => {
      console.log(err)
    }
}).render(paypal.current)
  })

  return (
    <div>
      <div ref={paypal}></div>
    </div>
    // <PayPalScriptProvider options={initialOptions}>
    //   <PayPalButtons
    //     createOrder={(data, actions) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             amount: {
    //               value: `${subtotal}`
    //             }
    //           }
    //         ]
    //       });
    //     }}
    //     onApprove={(data, actions) => {
    //       return actions.order.capture().then(function (details) {
    //         alert("Transaction Completed By" + details.payer.name.given_name);
    //       });
    //     }}
    //   />
    // </PayPalScriptProvider>
  );
}

export default PaypalButton;
