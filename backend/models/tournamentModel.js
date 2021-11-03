import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    teamCount: {
      type: Number,
      required: true,
      default: 0,
    },
    slot: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;
