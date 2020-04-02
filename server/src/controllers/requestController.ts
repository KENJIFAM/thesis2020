import express from 'express';
import { AuthRequest } from '../middleware/auth';
import db, { UserModel } from '../models';

const router = express.Router();

/**
 * POST request
 */
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const user = (await db.User.findById(req.auth?.id).orFail()) as UserModel;
    const request = await db.Request.create({
      ...req.body,
      user: req.auth?.id,
    });
    user.requests.push(request.id);
    await user.save();
    const foundRequest = await db.Request.findById(request.id).populate(
      'user',
      'id orgType orgName',
    );
    res.status(200).json(foundRequest);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET ALL requests
 */
router.get('/', async (req, res, next) => {
  try {
    const requests = await db.Request.find({})
      .sort({ createdAt: 'desc' })
      .populate('user', 'id orgType orgName');
    return res.status(200).json(requests);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET request by id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const request = await db.Request.findById(req.params.id).populate('user', 'id orgType orgName');
    return res.status(200).json(request);
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH request by id
 */
router.patch('/:id', async (req: AuthRequest, res, next) => {
  try {
    const request = await db.Request.findById(req.params.id);
    if (req.auth?.id !== request?.user) {
      return next({ status: 401, message: 'Not authorized to edit this request!' });
    }
    const editedRequest = await db.Request.findOneAndUpdate(
      { id: request?.id },
      { $set: req.body },
      { new: true },
    ).populate('user', 'id orgType orgName');
    return res.status(200).json(editedRequest);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE request by id
 */
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const request = await db.Request.findById(req.params.id);
    if (!request) {
      return next({ status: 401, message: 'This request does not exist!' });
    }
    if (!req.auth?.id || !request.user.equals(req.auth?.id)) {
      return next({ status: 401, message: 'Not authorized to delete this request!' });
    }
    await request.remove();
    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    return next(err);
  }
});

export default router;
