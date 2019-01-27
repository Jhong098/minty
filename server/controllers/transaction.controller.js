import Transaction from '../models/transaction';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getTransactions(req, res) {
  console.log('getting transactions')
  Transaction.find().sort('-dateAdded').exec((err, transaction) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ transaction });
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
