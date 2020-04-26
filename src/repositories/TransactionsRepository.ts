import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions.sort(function(a, b){return b.value - a.value});
  }

  public getBalance(): Balance {

    const incomeArray = this.transactions.filter(item => item.type === 'income');
    const outcomeArray = this.transactions.filter(item => item.type === 'outcome');


    const incomeValue = incomeArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.value;
    }, 0);

    const outcomeValue = outcomeArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.value;
    }, 0);

    return {
      income: incomeValue,
      outcome: outcomeValue,
      total: (incomeValue - outcomeValue)
    }
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
