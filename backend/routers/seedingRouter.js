/* eslint-disable no-unused-vars */
import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Team from '../models/teamModel.js';
import TeamMember from '../models/teamMemberModel.js';
import Tournament from '../models/tournamentModel.js';
import { userData, tournamentData, teamData, teamMemberData } from '../data.js';

const seedingRouter = express.Router();

seedingRouter.get(
  '/user',
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users.length === 0) {
      const createdUsers = await User.insertMany(userData);
      return res.status(201).send(createdUsers);
    }

    return res.send({ message: 'Nothing to seed' });
  }),
);

seedingRouter.get(
  '/tournament',
  asyncHandler(async (req, res) => {
    const tournaments = await Tournament.find({});
    if (tournaments.length === 0) {
      const createdTournaments = await Tournament.insertMany(tournamentData);
      return res.status(201).send(createdTournaments);
    }

    return res.send({ message: 'Nothing to seed' });
  }),
);

seedingRouter.get(
  '/team',
  asyncHandler(async (req, res) => {
    const teams = await Team.find({});
    if (teams.length === 0) {
      const createdTeams = await Team.insertMany(teamData);
      return res.status(201).send(createdTeams);
    }

    return res.send({ message: 'Nothing to seed' });
  }),
);
seedingRouter.get(
  '/team-member',
  asyncHandler(async (req, res) => {
    const teamMembers = await TeamMember.find({});
    if (teamMembers.length === 0) {
      const createdTeamMembers = await TeamMember.insertMany(teamMemberData);
      return res.status(201).send(createdTeamMembers);
    }

    return res.send({ message: 'Nothing to seed' });
  }),
);

export default seedingRouter;
