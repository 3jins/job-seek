import express from 'express';
import Company from '../../mongodb/model/Company';

const router = express.Router();

router.get('/', (req, res) => Company.find()
  .then(companies => res.json(companies))
  .catch((err) => {
    console.error(err);
    return res.status(500).json({
      message: 'Could not retrieve companies',
    });
  }));

export default router;
