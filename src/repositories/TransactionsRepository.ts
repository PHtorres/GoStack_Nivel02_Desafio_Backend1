import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const balance = this.transactions.reduce((accumulator, transaction) => {
      switch (transaction.type) {
        case 'income':
          accumulator.income = accumulator.income + Number(transaction.value);
          break;
        case 'outcome':
          accumulator.outcome = accumulator.outcome + Number(transaction.value);
          break;
      }

      return accumulator;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    const total = balance.income - balance.outcome;

    return { income: balance.income, outcome: balance.outcome, total };
  }

  public create(dados: Transaction): Transaction {
    this.transactions.push(dados);
    return dados;
  }
}

export default TransactionsRepository;
