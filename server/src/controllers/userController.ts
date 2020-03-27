import express from 'express';
import auth, { AuthRequest } from '../middleware/auth';
import db, { UserModel } from '../models';

const router = express.Router();

router.get('/', auth, async (req: AuthRequest, res, next) => {
  try {
    if (!req.auth?.id) {
      return next({ status: 401, message: 'Unauthorized error: private profile' });
    }
    const user = (await db.User.findById(req.auth.id).orFail()) as UserModel;
    const { id, email, orgName, orgType } = user;
    res.status(200).json({ id, email, orgName, orgType });
  } catch (err) {
    return next(err);
  }
});

export default router;
