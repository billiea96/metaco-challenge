import express from 'express';
import asyncHandler from 'express-async-handler';
import Team from '../models/teamModel.js';
import Tournament from '../models/tournamentModel.js';

const tournamentRouter = express.Router();

tournamentRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const tournaments = await Tournament.find({});
    res.send(tournaments);
  }),
);

tournamentRouter.get(
  '/teams/:tournamentId',
  asyncHandler(async (req, res) => {
    const { tournamentId } = req.params;
    const teams = await Team.find({ tournamentId })
      .populate('tournament')
      .sort({ name: 1 });
    res.send(teams);
  }),
);

export default tournamentRouter;
