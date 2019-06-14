import express from 'express';
import HiringNotice from '../../mongodb/model/HiringNotice';

const router = express.Router();

router.get('/:companyName?', (req, res) => {
  const companyName = req.params.companyName || null;
  const jobGroup = req.query.jobGroup || null;
  const category = req.query.category || null;

  const reqObj = {};
  if (companyName !== null) reqObj.companyName = companyName;
  if (jobGroup !== null) reqObj.jobGroup = jobGroup;
  if (category !== null) reqObj.category = category;
  console.log(reqObj);

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
