import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    captainId: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
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

teamSchema.virtual('captain', {
  ref: 'User',
  localField: 'captainId',
  foreignField: 'id',
  justOne: true,
});

teamSchema.virtual('tournament', {
  ref: 'Tournament',
  localField: 'tournamentId',
  foreignField: 'id',
  justOne: true,
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
