import express from 'express';
import Category from '../../mongodb/model/Category';

const router = express.Router();

router.get('/', (req, res) => Category.find()
  .then(categories => res.json(categories))
  .catch((err) => {
    console.error(err);
    return res.status(500).json({
      message: 'Could not retrieve categories',
    });
  }));

export default router;
