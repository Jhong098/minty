/* eslint-disable import/prefer-default-export */
import dayjs from "dayjs";
import { MockTransaction } from '../models/transaction';

function randomDate(range) {
  const today = new Date(Date.now());
  return new Date(today.getYear()+1900,today.getMonth(), today.getDate() - Math.random() * range).toLocaleDateString();
}

const getRandomDouble = (max) => {
  const precision = 100; // 2 decimals
  return Math.floor(Math.random() * (max * precision - 1 * precision) + 1 * precision) / (1*precision);
}

export const getMockTransactionsData = (count) => {
  const mockTransactions = [];
  const ACCOUNTS = ["Tangerine", "RBC", "CIBC", "BMO"];
  const TRANSACTION_NAMES = ["Best Buy", "Amazon", "Sobeys", "Spotify", "Netflix", "McDonald's"];
  const CATEGORIES = ["Shopping", "Food and Beverages", "Restaurants", "Shops"];

  for (let i = 0; i < count; ++i) {
    const _date = randomDate(10);
    mockTransactions.push(new MockTransaction({
      account: ACCOUNTS[i % ACCOUNTS.length],
      name: TRANSACTION_NAMES[i % TRANSACTION_NAMES.length],
      date: _date,
      dateISO: dayjs(_date).toISOString(),
      amount: getRandomDouble(100),
      category: CATEGORIES[i % CATEGORIES.length]
    }));
  }
  return mockTransactions;
};

export const SaveMockTransactionToDB = (count) => {
  const mocks = getMockTransactionsData(count);
  MockTransaction.create(mocks, err => {
    if (err) console.error(err);
  })
};
