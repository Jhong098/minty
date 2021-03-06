import { fetchBalances } from "./plaid/fetch";
import Balance from '../models/balance';


export default async () => {
  const balances = await fetchBalances();
  // console.log(balances)
  Balance.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    Balance.create(balances, (error) => {
      if (err) console.error(error);
    });
  });
};
