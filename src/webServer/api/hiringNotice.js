import express from 'express';
import HiringNotice from '../../mongodb/model/HiringNotice';

const router = express.Router();

router.get('/', (req, res) => {
  const company = req.query.company || null;
  const jobGroup = req.query.jobGroup || null;
  const category = req.query.category || null;

  const reqObj = {};
  if (company !== null) reqObj.companyName = company;
  if (jobGroup !== null) reqObj.jobGroup = jobGroup;
  if (category !== null) reqObj.category = category;

  return HiringNotice.find(reqObj)
    .then(hiringNoticeList => res.json(hiringNoticeList))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: 'Could not retrieve hiringNotices',
      });
    });
});

export default router;
