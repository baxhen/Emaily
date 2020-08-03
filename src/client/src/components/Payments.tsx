import React from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { connect } from 'react-redux';

import { handleToken } from '../actions';

interface PaymentsProps {
  handleToken(token: Token): void;
}

export class _Payments extends React.Component<PaymentsProps> {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={(token: Token) => {
          this.props.handleToken(token);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_KEY as string}
      >
        <button className="btn"> Add Credits</button>
      </StripeCheckout>
    );
  }
}

export const Payments = connect(null, { handleToken })(_Payments);
