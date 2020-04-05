import express from 'express';
import feedMocks from '../mocks/feeds';
import partnerMocks from '../mocks/partners';

const router = express.Router();

router.get('/feeds', async (req, res, next) => {
  res.status(200).json(feedMocks());
});

router.get('/partners', async (req, res, next) => {
  res.status(200).json(partnerMocks());
});

export default router;
