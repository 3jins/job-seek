import express from 'express';
import JobGroup from '../../mongodb/model/JobGroup';

const router = express.Router();

router.get('/', (req, res) => JobGroup.find()
  .then(jobGroups => res.json(jobGroups))
  .catch((err) => {
    console.error(err);
    return res.status(500).json({
      message: 'Could not retrieve jobGroups',
    });
  }));

export default router;
