import mongoose from 'mongoose';

const tournamentResultSchema = new mongoose.Schema(
  {
    teamId: {
      type: Number,
      required: true,
      index: true,
    },
    position: {
      type: Number,
    },
    point: {
      type: Number,
      required: true,
      default: 0,
    },
    tournamentId: {
      type: Number,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tournamentResultSchema.virtual('team', {
  ref: 'Team',
  localField: 'teamId',
  foreignField: 'id',
  justOne: true,
});

tournamentResultSchema.virtual('tournament', {
  ref: 'Tournament',
  localField: 'tournamentId',
  foreignField: 'id',
  justOne: true,
});

const TournamentResult = mongoose.model(
  'TournamenResult',
  tournamentResultSchema,
);

export default TournamentResult;
