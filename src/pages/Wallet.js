import React from 'react';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpensesForm />
        <Table />
      </div>
    );
  }
}

export default Wallet;
