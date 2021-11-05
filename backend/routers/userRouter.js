import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.get(
  '/ranking',
  asyncHandler(async (req, res) => {
    const explorer = await User.find({ coin: { $gt: 0 } }).sort({
      coin: -1,
      name: 1,
    });
    res.send(explorer);
  }),
);

export default userRouter;
