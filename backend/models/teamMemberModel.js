import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Number,
      required: true,
      index: true,
    },
    teamId: {
      type: Number,
      required: true,
      index: true,
    },
    roles: {
      type: String,
      enum: ['CAPTAIN', 'MEMBER', 'STANDIN'],
      required: true,
    },
    ingameId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

teamMemberSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'id',
  justOne: true,
});

teamMemberSchema.virtual('team', {
  ref: 'Team',
  localField: 'teamId',
  foreignField: 'id',
  justOne: true,
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
