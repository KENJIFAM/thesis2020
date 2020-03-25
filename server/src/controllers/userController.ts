import express from 'express';
import { checkLogIn, checkCorrectUser } from '../middleware/auth';
import db, { UserModel } from '../models';

const router = express.Router();

router.get('/', checkLogIn, checkCorrectUser, async (req, res, next) => {
  try {
    const user = (await db.User.findById(req.body.id).orFail()) as UserModel;
    const { id, email, orgName, orgType } = user;
    res.status(200).json({ id, email, orgName, orgType });
  } catch (err) {
    return next(err);
  }
});

export default router;
