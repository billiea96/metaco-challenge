import express from 'express';
import asyncHandler from 'express-async-handler';
import TeamMember from '../models/teamMemberModel.js';
import TournamentResult from '../models/tournamentResultModel.js';
import User from '../models/userModel.js';

const tournamentResultRouter = express.Router();
const point = {
  1: 5,
  2: 3,
  3: 2,
};

tournamentResultRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { tournamentId, teamId, position } = req.body;

    const existTournamentResult = await TournamentResult.findOne({
      teamId,
      tournamentId,
    });

    if (existTournamentResult) {
      return res.status(400).send({
        message: 'The result of team in this tournament have been submitted',
      });
    }

    const tournamentResult = new TournamentResult({
      teamId,
      position,
      point: point[position] || 0,
      tournamentId,
    });

    const createdTournamentResult = await tournamentResult.save();
    const teamMembers = await TeamMember.find({ teamId });

    // eslint-disable-next-line no-unused-vars
    const updatedUsers = teamMembers.map(async (member) => {
      try {
        await User.updateOne(
          { id: member.userId },
          { $inc: { coin: point[position] || 0 } },
        );

        const updatedUser = await User.findOne({ id: member.userId });
        return updatedUser;
      } catch (error) {
        console.log(error);
      }
    });

    const updatedTeamMembers = await TeamMember.find({ teamId }).populate(
      'user',
    );
    return res.send({
      status: 'success',
      createdTournamentResult,
      updatedTeamMembers,
    });
  }),
);

tournamentResultRouter.get(
  '/leaderboard',
  asyncHandler(async (req, res) => {
    const { filter = 'all' } = req.query;
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lastWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 7,
    );
    const dateFilter =
      filter === 'month'
        ? { createdAt: { $gte: firstDay, $lt: lastDay } }
        : filter === 'week'
        ? { createdAt: { $gte: lastWeek, $lt: date } }
        : {};
    const dataLeaderBoard = await TournamentResult.aggregate([
      {
        $match: { ...dateFilter },
      },
      {
        $lookup: {
          from: 'teams',
          localField: 'teamId',
          foreignField: 'id',
          as: 'teams',
        },
      },
      { $unwind: { path: '$teams', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'users',
          localField: 'teams.captainId',
          foreignField: 'id',
          as: 'users',
        },
      },
      { $unwind: { path: '$users', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: {
            id: '$teams.id',
            name: '$teams.name',
            captainName: '$users.name',
          },
          totalPoint: { $sum: '$point' },
        },
      },
      {
        $project: {
          _id: '$_id.id',
          teamName: '$_id.name',
          captainName: '$_id.captainName',
          totalPoint: '$totalPoint',
        },
      },
      {
        $sort: { totalPoint: -1, teamName: 1 },
      },
      {
        $limit: 20,
      },
    ]);

    res.send(dataLeaderBoard);
  }),
);

export default tournamentResultRouter;
