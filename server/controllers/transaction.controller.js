import Transaction from '../models/transaction';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

export function getDailyAggregatedTransactions(req, res) {
  Transaction.aggregate([
    {
      $match: {
        $and: [{name:{$regex: "^((?!Interest).)*$"}},{name:{$regex: "^((?!INTERAC).)*$"}},{name:{$regex: "^((?!Credit).)*$"}},{name:{$regex: "^((?!Payment).)*$", $options: 'i'}}]
      }
    },
    { $group: {
      _id: {
        day: {
          $dayOfYear: {
            $dateFromString: {
              dateString: "$dateISO"
            }
          }
        },
        year: {
          $year: {
            $dateFromString: {
              dateString: "$dateISO"
            }
          }
        }
      },
      dailyTotal: {
        $sum: "$amount"
      }, count: {
        $sum: 1
      }
    }
  }], (err, result) => {
    if (err) res.status(500).send(err);
    console.log(result)
    res.json({ result });
  });
}

export function getCategoryData(req, res) {
  Transaction.aggregate([{
    $group: {
      _id: {
        category_2: {
          $arrayElemAt: ['$category', 1]
        },
        category_1: {
          $arrayElemAt: ['$category', 0]
        }
      },
      count: {
        $sum: 1
      }
    }
  }], (err, result) => {
    if (err) res.status(500).send(err);
    res.json({ result });
  });
}

/**
 * Get all transactions
 * @param req
 * @param res
 * @returns void
 */

export function filterTransactions(req, res) {
  return Transaction.find({$and: [{name:{$regex: "^((?!Interest).)*$"}},{name:{$regex: "^((?!INTERAC).)*$"}},{name:{$regex: "^((?!Credit).)*$"}},{name:{$regex: "^((?!Payment).)*$", $options: 'i'}}]});
}

export function getTransactions(req, res) {
  filterTransactions()
    .sort('-dateAdded')
    .exec((err, transactions) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ transactions });
    });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addTransaction(req, res) {
  if (!req.body.transaction.name || !req.body.transaction.title || !req.body.transaction.content) {
    res.status(403).end();
  }

  const newTransaction = new Transaction(req.body.transaction);

  // Let's sanitize inputs
  newTransaction.title = sanitizeHtml(newTransaction.title);
  newTransaction.name = sanitizeHtml(newTransaction.name);
  newTransaction.content = sanitizeHtml(newTransaction.content);

  newTransaction.slug = slug(newTransaction.title.toLowerCase(), { lowercase: true });
  newTransaction.cuid = cuid();
  newTransaction.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ transaction: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getTransaction(req, res) {
  Transaction.findOne({ cuid: req.params.cuid }).exec((err, transaction) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ transaction });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteTransaction(req, res) {
  Transaction.findOne({ cuid: req.params.cuid }).exec((err, transaction) => {
    if (err) {
      res.status(500).send(err);
    }

    transaction.remove(() => {
      res.status(200).end();
    });
  });
}
