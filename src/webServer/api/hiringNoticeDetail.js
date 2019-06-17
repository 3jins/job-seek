import express from 'express';
import HiringNotice from '../../mongodb/model/HiringNotice';

const router = express.Router();

router.get('/:hiringNoticeId', (req, res) => {
  const { hiringNoticeId } = req.params;

  const reqObj = { _id: hiringNoticeId };

  return HiringNotice.find(reqObj)
    .then(hiringNoticeList => res.json(hiringNoticeList))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: 'Could not retrieve a hiringNotice',
      });
    });
});

export default router;
