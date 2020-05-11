import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(dados: RequestDTO): Transaction {

    const balance = this.transactionsRepository.getBalance();
    if (dados.type === 'outcome' && balance.total < dados.value) {
      throw new Error('You do not have enough balance');
    }
    const transaction = new Transaction(dados);
    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
