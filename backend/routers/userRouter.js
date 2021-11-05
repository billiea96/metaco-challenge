import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 12;
    const filter = req.query.keyword
      ? {
          $or: [
            {
              name: { $regex: req.query.keyword, $options: 'i' },
              email: { $regex: req.query.keyword, $options: 'i' },
            },
          ],
        }
      : {};
    const count = await User.count({ ...filter });
    const users = await User.find({ ...filter })
      .sort({
        coin: -1,
        name: 1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.send({ users, page, pages: Math.ceil(count / pageSize) });
  }),
);

export default userRouter;
