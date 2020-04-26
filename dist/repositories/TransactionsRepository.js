"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var incomeArray = this.transactions.filter(function (item) { return item.type = 'income'; });
        var outcomeArray = this.transactions.filter(function (item) { return item.type = 'outcome'; });
        var incomeValue = incomeArray.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.value;
        }, 0);
        var outcomeValue = outcomeArray.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.value;
        }, 0);
        return {
            income: incomeValue,
            outcome: outcomeValue,
            total: (incomeValue + outcomeValue)
        };
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1.default({ title: title, value: value, type: type });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
