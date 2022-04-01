// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const LOGIN = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const getCurrencies = (curr) => (
  { type: GET_CURRENCIES,
    payload: curr,
  }
);

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  const currs = Object.keys(result).filter((code) => code !== 'USDT');
  return dispatch(getCurrencies(currs));
};

const fetchExchangeRates = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  return response.json();
};

export const addExpense = (payload) => async (dispatch) => {
  dispatch({
    type: ADD_EXPENSE,
    payload: {
      ...payload,
      exchangeRates: await fetchExchangeRates(),
    },
  });
};
