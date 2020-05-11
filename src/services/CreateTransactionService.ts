import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO{
  title: string;
  value:number;
  type:'income'|'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(dados:RequestDTO): Transaction {
    const transaction = new Transaction(dados);
    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
