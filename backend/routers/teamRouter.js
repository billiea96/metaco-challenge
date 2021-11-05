import express from 'express';
import asyncHandler from 'express-async-handler';
import Team from '../models/teamModel.js';

const teamRouter = express.Router();

teamRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 12;
    const page = Number(req.query.page) || 1;
    const nameFilter = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    const count = await Team.count({ ...nameFilter });
    const teams = await Team.aggregate([
      {
        $match: nameFilter,
      },
      {
        $lookup: {
          from: 'tournamenresults',
          localField: 'id',
          foreignField: 'teamId',
          as: 'tournamenresults',
        },
      },
      {
        $unwind: {
          path: '$tournamenresults',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'captainId',
          foreignField: 'id',
          as: 'captain',
        },
      },
      { $unwind: { path: '$captain', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: '$id',
          teamName: '$name',
          captainName: '$captain.name',
          totalPoint: '$tournamenresults.point',
          logo: '$logo',
        },
      },
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
      {
        $sort: { totalPoint: -1, teamName: 1 },
      },
    ]);
    res.send({ teams, page, pages: Math.ceil(count / pageSize) });
  }),
);

export default teamRouter;
