import { fetchTransactions } from "./fetch";

require('dotenv').config()

;(async () => {
  const res = await fetchTransactions()
  console.log('Transactions fetch successful!')
  console.log(res)
})()
