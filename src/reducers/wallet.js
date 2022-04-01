// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  ADD_EXPENSE,
  UPDATE_TOTAL,
  REMOVE_EXPENSE,
} from '../actions/index';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  nextExpenseId: 0,
  totalExpenses: 0,
  idToEdit: 0,
  error: null,
  isEditing: false,
};

export const WALLET_INITIAL_STATE = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
};

const calculateTotal = (expenses) => expenses.reduce(
  (total, { value, currency, exchangeRates }) => (
    total + (Number(value) * Number(exchangeRates[currency].ask))
  ), 0,
);

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload, error: null,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload, id: state.nextExpenseId },
      ],
      nextExpenseId: state.nextExpenseId + 1,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  case UPDATE_TOTAL:
    return {
      ...state,
      totalExpenses: calculateTotal(state.expenses),
    };
  default:
    return state;
  }
};

export default walletReducer;
