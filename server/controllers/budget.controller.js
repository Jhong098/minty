import { BudgetSetting } from '../models/budget';
// import cuid from 'cuid';
// import slug from 'limax';
// import sanitizeHtml from 'sanitize-html';

export function getBudgetSettings(req, res) {
  BudgetSetting.find()
    .sort('-dateAdded')
    .exec((err, resp) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ resp });
    });
}
