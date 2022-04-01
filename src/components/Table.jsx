import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../actions';

class Table extends Component {
  render() {
    const {
      dispatch, wallet: {
        expenses,
      },
    } = this.props;

    return (
      <>
        <h2>Tabela de despesas</h2>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            { expenses
              .map(({ id, description, tag, method, value, exchangeRates, currency }) => {
                const exchange = Number(exchangeRates[currency].ask);
                const currencyName = exchangeRates[currency].name;
                const currentValueOfCurrency = Number(value).toFixed(2);
                const convertedValue = (exchange * Number(value)).toFixed(2);

                return (
                  <tr key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{currentValueOfCurrency}</td>
                    <td>{currencyName}</td>
                    <td>{exchange.toFixed(2)}</td>
                    <td>{convertedValue}</td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="edit-btn"
                        type="button"
                        onClick={ () => dispatch(editExpense(id)) }
                      >
                        Editar
                      </button>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        onClick={ () => dispatch(removeExpense(id)) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.obj),
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Table);
