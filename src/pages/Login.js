import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LOGIN } from '../actions';

class Login extends React.Component {
    state = {
      email: '',
      password: '',
      disabled: true,
    };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value }, this.bttnLogInValidation);
  };

  isAValidEmail = (email) => {
    // ref: https://stackoverflow.com/questions/46155/whats-the-best-way-to-valnameate-an-email-address-in-javascript
    const emailVerification = /\S+@\S+\.\S+/;
    return emailVerification.test(email);
  }

  bttnLogInValidation = () => {
    const minLengthPassword = 6;
    const { email, password } = this.state;
    const isValidPassword = password.length >= minLengthPassword;
    if ((this.isAValidEmail(email)) && isValidPassword) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { email, password, disabled } = this.state;
    const { logged, history } = this.props;

    return (
      <form>
        <h1>Login</h1>
        <input
          type="email"
          value={ email }
          name="email"
          onChange={ this.handleInputChange }
          placeholder="e-mail"
          data-testid="email-input"
        />
        <input
          type="password"
          value={ password }
          name="password"
          onChange={ this.handleInputChange }
          placeholder="senha"
          data-testid="password-input"
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ () => {
            logged(email);
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  logged: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logged: (email) => dispatch(LOGIN(email)),
});

export default connect(null, mapDispatchToProps)(Login);
