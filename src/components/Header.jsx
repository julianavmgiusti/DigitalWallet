import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  totalExpenses = () => {
    const { wallet: { expenses } } = this.props;
    const totalValue = expenses
      .reduce((acc, { exchangeRates, currency, value }) => (
        acc + ((exchangeRates[currency].ask) * value)), 0);
    return totalValue.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div className="cabecalho">
        <header>
          <h1>DigitalWallet</h1>
          <h1 data-testid="email-field">{email}</h1>
          <h1
            data-testid="total-field"
          >
            { this.totalExpenses() }
          </h1>
          <h1 data-testid="header-currency-field">BRL</h1>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object),
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);
