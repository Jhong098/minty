import Balance from '../models/balance';
// import cuid from 'cuid';
// import slug from 'limax';
// import sanitizeHtml from 'sanitize-html';

export function getBalances(req, res) {
  Balance.find()
    .sort('-dateAdded')
    .exec((err, balances) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ balances });
    });
}
