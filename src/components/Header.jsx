import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div className="cabecalho">
        <header>
          <h1>TrybeWallet</h1>
          <h1 data-testid="email-field">{email}</h1>
          <h1
            data-testid="total-field"
          >
            {
              'Despesa total: R$ 0,00 '
            }
          </h1>
          <h1 data-testid="header-currency-field">BRL</h1>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
