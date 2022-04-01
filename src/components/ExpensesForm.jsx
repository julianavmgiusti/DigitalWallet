import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../actions';
import InputSelect from './InputSelect';
import { WALLET_INITIAL_STATE } from '../reducers/wallet';

class ExpensesForm extends Component {
    state = {
      ...WALLET_INITIAL_STATE,
    };

    componentDidMount() {
      const { setCurrencies } = this.props;
      setCurrencies();
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    submitExpense = async (event) => {
      event.preventDefault();
      const { setNewExpense } = this.props;
      setNewExpense(this.state);
      this.newExpenseForm();
    }

    newExpenseForm = () => {
      this.setState({
        ...WALLET_INITIAL_STATE,
      });
    };

    render() {
      const { currencies } = this.props;
      const { value, description, currency, method, tag } = this.state;

      const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
      const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
      return (
        <form
          type="submit"
          onSubmit={ this.submitExpense }
        >
          <InputSelect
            name="value"
            data-testid="value-input"
            type="number"
            step=".01"
            label="Valor"
            value={ value }
            onChange={ this.handleChange }
          />
          <InputSelect
            name="description"
            data-testid="description-input"
            label="Descrição"
            value={ description }
            onChange={ this.handleChange }
          />
          <InputSelect
            id="currency"
            label="Moeda"
            type="select"
            name="currency"
            options={ currencies }
            onChange={ this.handleChange }
            value={ currency }
            data-testid="currency-input"
          />
          <InputSelect
            name="method"
            data-testid="method-input"
            label="Método de pagamento"
            type="select"
            options={ methods }
            value={ method }
            onChange={ this.handleChange }
          />
          <InputSelect
            name="tag"
            type="select"
            data-testid="tag-input"
            label="Tag"
            options={ tags }
            value={ tag }
            onChange={ this.handleChange }
          />
          <input
            type="submit"
            value="Adicionar despesa"
          />

        </form>
      );
    }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(fetchCurrencies()),
  setNewExpense: (expense) => dispatch(addExpense(expense)),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setCurrencies: PropTypes.func.isRequired,
  setNewExpense: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
